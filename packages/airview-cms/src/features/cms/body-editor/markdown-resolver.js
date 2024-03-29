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

    return URL.createObjectURL(blob);
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
  this.resolveOutbound = async function (markdownBody, images) {
    const markdownImageURLs = this.searchMarkdownStringForImages(markdownBody);

    let replacements = [];

    Object.entries(images).forEach(([key, value]) => {
      if (markdownImageURLs.includes(value)) {
        replacements.push({ original: value, replacement: key });
      }
    });

    const resolvedMarkdown = this.findAndReplaceImagesWithinMarkdownString(
      markdownBody,
      replacements
    );

    let resolvedImages = {};

    for (const replacement of replacements) {
      resolvedImages[`${replacement.replacement}`] =
        await this.convertObjectURLtoBase64String(replacement.original);
    }

    return { resolvedMarkdown, resolvedImages };
  };
}
