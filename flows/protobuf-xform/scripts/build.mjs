

// "build:proto": "pbjs -t static-module -w commonjs -o compiled.js proto/sensor.proto",
// "build:proto2": "pbts -o compiled.d.ts compiled.js",
// pbjs -t static-module -w commonjs -o compiled.js proto/sensor.proto

import { execSync } from 'child_process';

function buildProto(name) {
    const protoFile = `proto/${name}.proto`;
    const outJs = `src/${name}.js`;
    const outDts = `src/${name}.d.ts`;

    // Generate JS from proto
    execSync(`pbjs -t static-module -w default -o ${outJs} ${protoFile}`, { stdio: 'inherit' });

    // Generate TS definitions from JS
    execSync(`pbts -o "${outDts}" "${outJs}"`, { stdio: 'inherit' });
}

buildProto("sensor");


console.log('Protobuf files compiled to JS and TypeScript definitions.');
