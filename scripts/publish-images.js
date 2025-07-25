const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const pipelineFilename = "pipeline.toml";
const registry = process.env.REGISTRY || "ghcr.io";
const owner = process.env.OWNER || "thin-edge";

let workspaces = "--workspaces";
if (process.argv.length > 2) {
  workspaces = process.argv
    .slice(2)
    .map((value) => `-w ${path.basename(value)}`)
    .join(" ");
}

const projects = JSON.parse(
  execSync(`npm pkg get ${workspaces} name version module`),
);

for (const [_, project] of Object.entries(projects)) {
  const projectDir = `flows/${project.name}`;
  if (fs.existsSync(path.join(projectDir, pipelineFilename))) {
    const image = `${registry}/${owner}/${project.name}:${project.version}`;
    console.log(
      `\nPublishing pipeline. project=${project.name}, version=${project.version}, module=${project.module}`,
    );
    execSync(
      `tedge-oscar flows images push ${image} --file ${projectDir}/${project.module} --file ${projectDir}/${pipelineFilename} --root ${projectDir}`,
    );
  }
}

process.exit(0);
