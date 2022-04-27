import fetch from "node-fetch";
import matter from "gray-matter";

describe("createHandlers", () => {
  test("a request to fetch branches", async () => {
    const expected = [
      { name: "main", sha: "abc", isProtected: true },
      { name: "one", sha: "cde", isProtected: false },
      { name: "two", sha: "efg", isProtected: false },
    ];

    const response = await fetch("http://airview-mock-server/api/branches");

    const data = await response.json();

    expect(data).toEqual(expected);
  });

  test("a request to create a branch", async () => {
    const branchCreateRequest = await fetch(
      "http://airview-mock-server/api/branches",
      {
        method: "POST",
        body: JSON.stringify({
          sha: "cde",
          name: "test_branch",
        }),
      }
    );

    expect(branchCreateRequest.status).toBe(200);

    const expectedBranches = [
      { name: "main", sha: "abc", isProtected: true },
      { name: "one", sha: "cde", isProtected: false },
      { name: "two", sha: "efg", isProtected: false },
      { name: "test_branch", sha: "shaid", isProtected: false },
    ];

    const branchesResponse = await fetch(
      "http://airview-mock-server/api/branches"
    );

    const branchesData = await branchesResponse.json();

    expect(branchesData).toEqual(expectedBranches);

    const expectedAllEntries = {
      "release/security_patch": {
        id: "release/security_patch",
        collection: "release",
        sha: ["shaid"],
        meta: {
          title: "Security Patch",
          parent: "application/ms_teams",
        },
      },
    };

    const allEntriesResponse = await fetch(
      "http://airview-mock-server/api/entries/test_branch"
    );

    const allEntriesData = await allEntriesResponse.json();

    expect(allEntriesData).toEqual(expectedAllEntries);
  });

  test("a request to delete a branch", async () => {
    const deleteRequest = await fetch(
      "http://airview-mock-server/api/content/one",
      {
        method: "DELETE",
      }
    );

    expect(deleteRequest.status).toBe(200);

    const expectedBranches = [
      { name: "main", sha: "abc", isProtected: true },
      { name: "two", sha: "efg", isProtected: false },
    ];

    const branchesResponse = await fetch(
      "http://airview-mock-server/api/branches"
    );

    const branchesData = await branchesResponse.json();

    expect(branchesData).toEqual(expectedBranches);

    const allEntriesMetaResponse = await fetch(
      "http://airview-mock-server/api/entries/one"
    );

    expect(allEntriesMetaResponse.status).toBe(404);
  });

  test("a request to get all entries meta", async () => {
    const expected = {
      "release/security_patch": {
        id: "release/security_patch",
        collection: "release",
        sha: ["shaid"],
        meta: {
          title: "Security Patch",
          parent: "application/ms_teams",
        },
      },
    };

    const response = await fetch("http://airview-mock-server/api/entries/one");

    const data = await response.json();

    expect(data).toEqual(expected);
  });

  test("a request to get an entry", async () => {
    const expected = {
      content: "I am branch one body content for Security Patch\n",
      data: {
        title: "Security Patch",
      },
      excerpt: "",
      isEmpty: false,
    };

    const response = await fetch(
      "http://airview-mock-server/api/content/release/security_patch/one"
    );

    const data = await response.json();

    expect(matter(atob(data["_index"]))).toEqual(expected);
  });

  test("a request to edit an entry", async () => {
    const mutations = {
      content: "Test",
      title: "Test mutation",
    };

    const putResponse = await fetch(
      "http://airview-mock-server/api/content/release/security_patch/one",
      {
        method: "PUT",
        body: JSON.stringify({
          _index: btoa(
            matter.stringify(mutations.content, { title: mutations.title })
          ),
        }),
      }
    );

    expect(putResponse.status).toBe(200);

    const metaResponse = await fetch(
      "http://airview-mock-server/api/entries/one"
    );

    const metaData = await metaResponse.json();

    expect(metaData["release/security_patch"].meta.title).toBe(mutations.title);

    const entryResponse = await fetch(
      "http://airview-mock-server/api/content/release/security_patch/one"
    );

    const entryData = await entryResponse.json();

    const { content, data } = matter(atob(entryData["_index"]));

    expect(content).toEqual(expect.stringContaining(mutations.content));
    expect(data.title).toBe(mutations.title);
  });

  test("a request to create an entry", async () => {
    const entryData = {
      content: "Entry body",
      title: "Test entry",
    };

    const putResponse = await fetch(
      "http://airview-mock-server/api/content/release/test_entry/one",
      {
        method: "PUT",
        body: JSON.stringify({
          _index: btoa(
            matter.stringify(entryData.content, { title: entryData.title })
          ),
        }),
      }
    );

    expect(putResponse.status).toBe(200);

    const metaResponse = await fetch(
      "http://airview-mock-server/api/entries/one"
    );

    const metaData = await metaResponse.json();

    expect(metaData["release/test_entry"].meta.title).toBe(entryData.title);

    const entryResponse = await fetch(
      "http://airview-mock-server/api/content/release/test_entry/one"
    );

    const entryReponseData = await entryResponse.json();

    const { content, data } = matter(atob(entryReponseData["_index"]));

    expect(content).toEqual(expect.stringContaining(entryData.content));
    expect(data.title).toBe(entryData.title);
  });

  test("a request to delete an entry", async () => {
    const deleteResponse = await fetch(
      "http://airview-mock-server/api/content/release/security_patch/one",
      { method: "DELETE" }
    );

    expect(deleteResponse.status).toBe(200);

    const metaResponse = await fetch(
      "http://airview-mock-server/api/entries/one"
    );

    const metaData = await metaResponse.json();

    expect(metaData).toEqual({});

    const entryResponse = await fetch(
      "http://airview-mock-server/api/content/release/security_patch/one"
    );

    expect(entryResponse.status).toBe(404);
  });
});
