const mime = require("mime");

export function MarkdownResolverUtils() {
  this.searchMarkdownStringForImages = function (markdownString) {
    if (!markdownString) return;

    const regexp =
      /!\[[^\]]*\]\((?<filename>.*?)(?=\s|"|\))(?<optionalpart>"|\s.*")?\)/g;

    const images = [...markdownString.matchAll(regexp)];

    if (images.length < 1) return [];

    const resolvedImages = images.reduce((prevValue, currentValue) => {
      return [...prevValue, currentValue.groups.filename];
    }, []);

    return resolvedImages;
  };

  this.createObjectURLfromBase64String = async function (fileName, string) {
    const blob = await this.convertBase64StringToBlob(fileName, string);

    return {
      [`${fileName}`]: URL.createObjectURL(blob),
    };
  };

  this.convertBase64StringToBlob = async function (fileName, string) {
    const mimeType = mime.getType(fileName);

    return await (await fetch(`data:${mimeType};base64,${string}`)).blob();
  };

  this.convertObjectURLtoBase64String = async function (objectURLString) {
    const blob = await fetch(objectURLString).then((r) => r.blob());

    const blobToBase64 = (blob) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      return new Promise((resolve) => {
        reader.onloadend = () => {
          const s = reader.result;
          const b64Encoded = s.replace(/^data:[a-z/*]+;base64,/, "");
          resolve(b64Encoded);
        };
      });
    };

    return blobToBase64(blob);
  };

  this.findAndReplaceImagesWithinMarkdownString = function (
    markdownString,
    replacements
  ) {
    let parsedMarkdown = markdownString;

    replacements.forEach((replacement) => {
      parsedMarkdown = parsedMarkdown.replace(
        replacement.original,
        replacement.replacement
      );
    });

    return parsedMarkdown;
  };

  this.resolveInbound = async function (markdownBody, images) {
    const markdownImageURLs = this.searchMarkdownStringForImages(markdownBody);

    let resolvedImages = {};

    for (const imageURL of markdownImageURLs) {
      const image = await this.createObjectURLfromBase64String(
        imageURL,
        images[imageURL]
      );

      resolvedImages = {
        ...resolvedImages,
        ...image,
      };
    }

    const resolvedMarkdown = this.findAndReplaceImagesWithinMarkdownString(
      markdownBody,
      Object.entries(resolvedImages).map(([original, replacement]) => ({
        original,
        replacement,
      }))
    );

    return { resolvedMarkdown, resolvedImages };
  };

  this.resolveOutbound = async function (markdownBody, images) {
    console.log(markdownBody);
    console.log(images);

    // const markdownImageURLs = this.searchMarkdownStringForImages(markdownBody);

    // let replacements = [];

    // Object.entries(images).forEach(([key, value]) => {
    //   if (markdownImageURLs.includes(value)) {
    //     replacements.push({ original: value, replacement: key });
    //   }
    // });

    // const resolvedMarkdown = this.findAndReplaceImagesWithinMarkdownString(
    //   markdownBody,
    //   replacements
    // );

    // let resolvedImages = {};

    // for (const replacement of replacements) {
    //   console.log(replacement);

    //   resolvedImages[`${replacement.replacement}`] =
    //     await this.convertObjectURLtoBase64String(replacement.orginal);
    // }

    const imageString =
      "iVBORw0KGgoAAAANSUhEUgAAAIwAAABkBAMAAACm+cXiAAAAG1BMVEXMzMyWlpacnJzFxcW3t7e+vr6jo6OxsbGqqqqoPjQzAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAA2ElEQVRYhe3SMQ6CQBAF0GGBQCkBrFU0sRziBcR4AJELyA2INpRUyLFdBhIoASuS/6rNL34ms0MEAAAAAACwboqJYrYO11FwO9IomCTRNTmn93AI7CB5jIIpDI/JzvlL5RC4hVMNwSR2yqRSPtGT6E21BOph7ySYMw5TaXBEsd7KJ5RAsbmRYFaNGRnst3XWtpJAP30JZtW4RT+NXvUf0yjPC7pV7PuaRbsxL3HWtB/jnF/deJVTNfN+SlZgdHcTZ92KF9xNXyNHW+svl2DBFQMAAAAAwOr9AMPbIYfChnnxAAAAAElFTkSuQmCC";
    console.log("imageString", imageString);

    const imageURL = await this.createObjectURLfromBase64String(
      "test-image.jpg",
      imageString
    );
    console.log("imageURL", imageURL);

    const convertedImageURL = await this.convertObjectURLtoBase64String(
      imageURL
    );
    console.log("convertedImageURL", convertedImageURL);
  };
}
