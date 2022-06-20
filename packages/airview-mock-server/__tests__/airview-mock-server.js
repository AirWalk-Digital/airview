import fetch from "node-fetch";
import matter from "gray-matter";

const fetchBranches = async () => {
  const response = await fetch("http://airview-mock-server/api/branches");

  return await response.json();
};

const fetchEntries = async (branchSha) => {
  const response = await fetch(
    `http://airview-mock-server/api/entries/${branchSha}`
  );

  return await response.json();
};

describe("AirviewMockServer", () => {
  test("creating a new branch", async () => {
    // Fetch branches and get sha for branch "one"
    const initialBranchData = await fetchBranches();

    const branchOneSha = initialBranchData.find(
      (branch) => branch.name === "one"
    ).sha;

    // Fetch entries meta for branch "one"
    const branchOneEntriesData = await fetchEntries(branchOneSha);

    expect(branchOneEntriesData).toEqual([
      {
        id: "release/security_patch",
        sha: expect.any(String),
        collection: "release",
        meta: { title: "Security Patch", parent: "application/ms_teams" },
      },
    ]);

    // Create new branch "test_branch"
    const newBranchName = "test_branch";

    await fetch("http://airview-mock-server/api/branches", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        baseBranchSha: branchOneSha,
        branchName: newBranchName,
      }),
    });

    // Fetch modified branches and get data for new branch
    const modifiedBranches = await fetchBranches();

    const modifiedBranchOneSha = modifiedBranches.find(
      (branch) => branch.name === "one"
    ).sha;

    expect(modifiedBranches).toEqual([
      {
        name: "main",
        isProtected: true,
        sha: expect.any(String),
      },
      {
        name: "one",
        isProtected: false,
        sha: expect.any(String),
      },
      {
        name: "two",
        isProtected: false,
        sha: expect.any(String),
      },
      {
        name: newBranchName,
        isProtected: false,
        sha: expect.any(String),
      },
    ]);

    // Fetch entries meta for new branch "test_branch"
    const newBranchEntriesData = await fetchEntries(modifiedBranchOneSha);

    expect(branchOneEntriesData).toEqual(newBranchEntriesData);
  });

  test("deleting a branch", async () => {
    // Fetch branches and get sha for branch "one"
    const initialBranchesData = await fetchBranches();
    const branchOneSha = initialBranchesData.find(
      (branch) => branch.name === "one"
    ).sha;

    // Send request to delete branch "one"
    await fetch(`http://airview-mock-server/api/content/${branchOneSha}`, {
      method: "DELETE",
    });

    // Re-fetch branches data
    const modifiedBranchesData = await fetchBranches();

    expect(modifiedBranchesData).toEqual([
      {
        name: "main",
        isProtected: true,
        sha: expect.any(String),
      },
      {
        name: "two",
        isProtected: false,
        sha: expect.any(String),
      },
    ]);

    // Fetch entries meta by removed branch sha
    const entriesMetaResponse = await fetch(
      `http://airview-mock-server/api/entries/${branchOneSha}`
    );

    expect(entriesMetaResponse.status).toBe(404);
  });

  test("create an entry", async () => {
    // Fetch branches and get sha for branch "one"
    const initialBranchData = await fetchBranches();

    const initialBranchOneSha = initialBranchData.find(
      (branch) => branch.name === "one"
    ).sha;

    // Make a request to create an entry under branch "one"
    const entryData = {
      content: "Entry body",
      title: "Test entry",
    };

    await fetch(
      `http://airview-mock-server/api/content/release/test_entry/one`,
      {
        method: "PUT",
        body: JSON.stringify({
          "_index.md": btoa(
            matter.stringify(entryData.content, { title: entryData.title })
          ),
        }),
      }
    );

    // Fetch branches again due to mutation of entry
    const modifiedBranchData = await fetchBranches();

    const modifiedBranchOneSha = modifiedBranchData.find(
      (branch) => branch.name === "one"
    ).sha;

    expect(initialBranchOneSha).not.toBe(modifiedBranchOneSha);

    // Fetch all entries meta for branch "one"
    const allEntriesMetaData = await fetchEntries(modifiedBranchOneSha);

    expect(allEntriesMetaData).toEqual([
      {
        id: "release/security_patch",
        sha: expect.any(String),
        collection: "release",
        meta: { title: "Security Patch", parent: "application/ms_teams" },
      },
      {
        id: "release/test_entry",
        sha: expect.any(String),
        collection: "release",
        meta: { title: "Test entry" },
      },
    ]);

    const entrySha = allEntriesMetaData.find(
      (entry) => entry.id === "release/test_entry"
    ).sha;

    // Fetch entry content
    const entryContentRequest = await fetch(
      `http://airview-mock-server/api/content/${entrySha}`
    );

    const entryContentData = await entryContentRequest.json();

    expect(entryContentData).toEqual({
      content: expect.objectContaining({
        "_index.md": expect.any(String),
      }),
    });

    const markdownContent = matter(atob(entryContentData.content["_index.md"]));

    expect(markdownContent.content).toEqual(
      expect.stringContaining(entryData.content)
    );

    expect(markdownContent.data).toEqual({
      title: entryData.title,
    });
  });

  test("edit an entry", async () => {
    // Fetch branches and get sha for branch "one"
    const initialBranchData = await fetchBranches();

    const initialBranchOneSha = initialBranchData.find(
      (branch) => branch.name === "one"
    ).sha;

    const initialEntriesData = await fetchEntries(initialBranchOneSha);

    expect(initialEntriesData).toEqual([
      {
        id: "release/security_patch",
        sha: expect.any(String),
        collection: "release",
        meta: { title: "Security Patch", parent: "application/ms_teams" },
      },
    ]);

    // Make a request to edit an entry under branch "one"
    const entryData = {
      content: "Entry body",
      title: "Test entry",
    };

    await fetch(
      `http://airview-mock-server/api/content/release/security_patch/one`,
      {
        method: "PUT",
        body: JSON.stringify({
          "_index.md": btoa(
            matter.stringify(entryData.content, { title: entryData.title })
          ),
        }),
      }
    );

    // Fetch branches again due to mutation of entry
    const modifiedBranchData = await fetchBranches();

    const modifiedBranchOneSha = modifiedBranchData.find(
      (branch) => branch.name === "one"
    ).sha;

    // Fetch all entries meta for branch "one"
    const modifiedEntriesMetaData = await fetchEntries(modifiedBranchOneSha);

    expect(modifiedEntriesMetaData).toEqual([
      {
        id: "release/security_patch",
        sha: expect.any(String),
        collection: "release",
        meta: { title: entryData.title },
      },
    ]);

    expect(
      initialEntriesData.find((entry) => entry.id === "release/security_patch")
        .sha
    ).not.toBe(
      modifiedEntriesMetaData.find(
        (entry) => entry.id === "release/security_patch"
      ).sha
    );
  });

  test("delete an entry", async () => {
    // Get intial branches data
    const intialBranchData = await fetchBranches();

    const branchOneSha = intialBranchData.find(
      (branch) => branch.name === "one"
    ).sha;

    const initialEntriesMeta = await fetchEntries(branchOneSha);

    // Request to delete an entry
    await fetch(
      "http://airview-mock-server/api/content/release/security_patch/one",
      { method: "DELETE" }
    );

    // Refetch branches data
    const modifiedBranchesData = await fetchBranches();
    const modifiedBranchOneSha = modifiedBranchesData.find(
      (branch) => branch.name === "one"
    ).sha;

    expect(branchOneSha).not.toBe(modifiedBranchOneSha);

    // Fetch entries meta
    const entriesMeta = await fetchEntries(modifiedBranchOneSha);

    expect(entriesMeta).toEqual([]);

    // Attempt to fetch deleted entry by old sha
    const entrySha = initialEntriesMeta.find(
      (entry) => entry.id === "release/security_patch"
    ).sha;

    const entryResponse = await fetch(
      `http://airview-mock-server/api/content/${entrySha}`
    );

    expect(entryResponse.status).toBe(404);
  });
});
