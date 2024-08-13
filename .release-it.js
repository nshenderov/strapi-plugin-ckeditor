const template = `
{{> header}}

{{#each noteGroups}}
### ⚠️ {{title}}
{{#each notes}}
* {{#if commit.scope}}**{{commit.scope}}:** {{/if}}{{text}}
{{/each}}
{{/each}}

{{#each commitGroups}}
### {{title}}
{{#each commits}}
{{> commit root=@root}}
{{/each}}
{{/each}}

**Full Changelog**: [{{previousTag}}...{{currentTag}}]({{@root.host}}/{{#if @root.owner}}{{@root.owner}}/{{/if}}{{@root.repository}}/compare/{{previousTag}}...{{currentTag}})
`;

module.exports = {
  git: {
    commitMessage: "chore: release v${version}",
    requireCleanWorkingDir: false
  },
  github: {
    release: true,
    releaseName: "v${version}"
  },
  npm: {
    publish: false
  },
  plugins: {
    "@release-it/conventional-changelog": {
      writerOpts: {
        headerPartial: "## What's Changed\n",
        mainTemplate: template
      },
      preset: {
        name: "conventionalcommits",
        types: [
          { type: "feat", section: "🚀 Features" },
          { type: "fix", section: "👾 Bug Fixes" },
          { type: "docs", section: "📜 Docs" },
          { type: "chore", section: "⚙️ Chore" },
          { type: "style", section: "💅 Style" }
        ]
      }
    }
  }
};
