"use server";

export async function getPortfolioStateAction() {
  const gistId = process.env.GIST_ID;
  const githubToken = process.env.GITHUB_TOKEN;

  if (!gistId || !githubToken) {
    return { success: false, message: "GitHub keys missing" };
  }

  try {
    const response = await fetch(`https://api.github.com/gists/${gistId}`, {
      headers: {
        "Authorization": `Bearer ${githubToken}`,
        "Accept": "application/vnd.github.v3+json",
      },
      next: { revalidate: 0 } // Always fetch fresh
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.statusText}`);
    }

    const data = await response.json();
    const content = data.files["portfolio_state.json"]?.content;

    if (content) {
      return { success: true, data: JSON.parse(content) };
    } else {
      return { success: false, message: "No state found in Gist" };
    }
  } catch (error: any) {
    console.error("Gist Get Error:", error);
    return { success: false, message: error.message };
  }
}

export async function updatePortfolioStateAction(stateData: any) {
  const gistId = process.env.GIST_ID;
  const githubToken = process.env.GITHUB_TOKEN;

  if (!gistId || !githubToken) {
    return { success: false, message: "GitHub keys missing" };
  }

  try {
    const response = await fetch(`https://api.github.com/gists/${gistId}`, {
      method: "PATCH",
      headers: {
        "Authorization": `Bearer ${githubToken}`,
        "Accept": "application/vnd.github.v3+json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        files: {
          "portfolio_state.json": {
            content: JSON.stringify(stateData, null, 2)
          }
        }
      })
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.statusText}`);
    }

    return { success: true };
  } catch (error: any) {
    console.error("Gist Set Error:", error);
    return { success: false, message: error.message };
  }
}
