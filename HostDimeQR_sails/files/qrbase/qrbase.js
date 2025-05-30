(async () => {
    const { QRCodeStyling } = require('@ckho/qr-code-styling/lib/qr-code-styling.common');
    const nodeCanvas = require("canvas");
    const { JSDOM } = require("jsdom");
    const fs = require("fs");

    // WORKING WITH NODE v16.20.2

    // let options = {
    //     "width": 5000,
    //     "height": 5000,
    //     "data": "https://files.hostdime.com/",
    //     "margin": 0,
    //     "qrOptions": {
    //         "typeNumber": "0",
    //         "mode": "Byte",
    //         "errorCorrectionLevel": "H"
    //     },
    //     "imageOptions": {
    //         "hideBackgroundDots": true,
    //         "imageSize": 0.32,
    //         "margin": 2
    //     },
    //     "dotsOptions": {
    //         "type": "dots",
    //         "color": "#000000",
    //         "gradient": null
    //     },
    //     "backgroundOptions": {
    //         "color": "rgba(255, 255, 255, 0)"
    //     },
    //     "image": "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDEzNC40IDEzNC40IiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCAxMzQuNCAxMzQuNCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxwYXRoIGZpbGw9IiM3NDgyODYiIGQ9Ik02OS40LDE5LjZjLTAuOS0wLjMtMi40LTAuMy0zLjQsMEwxOC4zLDM2LjFjLTAuOSwwLjMtMS43LDEuNC0xLjcsMi40djEyLjZjMCwxLDAuOCwxLjcsMS44LDEuNWw0Ny42LTcuNwogIGMxLTAuMiwyLjUtMC4yLDMuNSwwbDQ3LjYsNy43YzEsMC4yLDEuOC0wLjUsMS44LTEuNVYzOC41YzAtMS0wLjgtMi0xLjctMi40TDY5LjQsMTkuNnoiPjwvcGF0aD4KPHBhdGggZmlsbD0iI0YzNzgyMSIgZD0iTTY5LjUsNTQuM2MtMS0wLjEtMi42LTAuMS0zLjUsMGwtNDcuNiw0LjRjLTEsMC4xLTEuOCwxLTEuOCwxLjl2MTIuNmMwLDEsMC44LDEuOSwxLjgsMS45bDQ3LjYsNC40CiAgYzEsMC4xLDIuNiwwLjEsMy41LDBsNDcuNi00LjRjMS0wLjEsMS44LTEsMS44LTEuOVY2MC42YzAtMS0wLjgtMS45LTEuOC0xLjlMNjkuNSw1NC4zeiI+PC9wYXRoPgo8cGF0aCBmaWxsPSIjNzQ4Mjg2IiBkPSJNNjkuNCw4OC45Yy0xLDAuMi0yLjUsMC4yLTMuNSwwbC00Ny42LTcuN2MtMS0wLjItMS44LDAuNS0xLjgsMS41djEyLjZjMCwxLDAuOCwyLDEuNywyLjRMNjYsMTE0LjMKICBjMC45LDAuMywyLjQsMC4zLDMuNCwwbDQ3LjctMTYuNWMwLjktMC4zLDEuNy0xLjQsMS43LTIuNFY4Mi44YzAtMS0wLjgtMS43LTEuOC0xLjVMNjkuNCw4OC45eiI+PC9wYXRoPgo8cGF0aCBmaWxsPSIjRjM3ODIxIiBkPSJNMS45LDQyLjVjMC0xLDAuOC0yLDEuNy0yLjRsOC4yLTIuOGMwLjktMC4zLDEuNywwLjIsMS43LDEuMnY1NS45YzAsMS0wLjgsMS41LTEuNywxLjJsLTguMi0yLjgKICBjLTAuOS0wLjMtMS43LTEuNC0xLjctMi40VjQyLjV6Ij48L3BhdGg+CjxwYXRoIGZpbGw9IiNGMzc4MjEiIGQ9Ik0xMzMuNSw0My41YzAtMS0wLjgtMi0xLjctMi40bC04LjItMi44Yy0wLjktMC4zLTEuNywwLjItMS43LDEuMnY1NC44YzAsMSwwLjgsMS41LDEuNywxLjJsOC4yLTIuOAogIGMwLjktMC4zLDEuNy0xLjQsMS43LTIuNFY0My41eiI+PC9wYXRoPgo8bGluZWFyR3JhZGllbnQgaWQ9IlNWR0lEXzFfIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9IjE2LjA3NDMiIHkxPSI5Ny44Nzg1IiB4Mj0iNjcuMTY5IiB5Mj0iOTcuODc4NSI+CiAgPHN0b3Agb2Zmc2V0PSIwIiBzdHlsZT0ic3RvcC1jb2xvcjojNzQ4Mjg2Ij48L3N0b3A+CiAgPHN0b3Agb2Zmc2V0PSIxIiBzdHlsZT0ic3RvcC1jb2xvcjojNTg2MzY2Ij48L3N0b3A+CjwvbGluZWFyR3JhZGllbnQ+CjxwYXRoIGRpc3BsYXk9Im5vbmUiIGZpbGw9InVybCgjU1ZHSURfMV8pIiBkPSJNNjcuMiw4OWMtMC42LDAtMS4zLDAtMS44LTAuMWwtNDcuNi03LjdjLTEtMC4yLTEuOCwwLjUtMS44LDEuNXYxMi42CiAgYzAsMSwwLjgsMiwxLjcsMi40bDQ3LjcsMTYuNWMwLjUsMC4yLDEuMSwwLjIsMS43LDAuMlY4OXoiPjwvcGF0aD4KPGxpbmVhckdyYWRpZW50IGlkPSJTVkdJRF8yXyIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIHgxPSIxNi4wNzQzIiB5MT0iNjYuOTI0NCIgeDI9IjY3LjE2OSIgeTI9IjY2LjkyNDQiPgogIDxzdG9wIG9mZnNldD0iMCIgc3R5bGU9InN0b3AtY29sb3I6I0YzNzgyMSI+PC9zdG9wPgogIDxzdG9wIG9mZnNldD0iMSIgc3R5bGU9InN0b3AtY29sb3I6I0NCNjUyOCI+PC9zdG9wPgo8L2xpbmVhckdyYWRpZW50Pgo8cGF0aCBkaXNwbGF5PSJub25lIiBmaWxsPSJ1cmwoI1NWR0lEXzJfKSIgZD0iTTY3LjIsNTQuMmMtMC42LDAtMS4zLDAtMS44LDAuMWwtNDcuNiw0LjRjLTEsMC4xLTEuOCwxLTEuOCwxLjl2MTIuNgogIGMwLDEsMC44LDEuOSwxLjgsMS45bDQ3LjYsNC40YzAuNSwwLDEuMSwwLjEsMS44LDAuMVY1NC4yeiI+PC9wYXRoPgo8bGluZWFyR3JhZGllbnQgaWQ9IlNWR0lEXzNfIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9IjE2LjA3NDMiIHkxPSIzNi4wMDIiIHgyPSI2Ny4xNjkiIHkyPSIzNi4wMDIiPgogIDxzdG9wIG9mZnNldD0iMCIgc3R5bGU9InN0b3AtY29sb3I6Izc0ODI4NiI+PC9zdG9wPgogIDxzdG9wIG9mZnNldD0iMSIgc3R5bGU9InN0b3AtY29sb3I6IzU4NjM2NiI+PC9zdG9wPgo8L2xpbmVhckdyYWRpZW50Pgo8cGF0aCBkaXNwbGF5PSJub25lIiBmaWxsPSJ1cmwoI1NWR0lEXzNfKSIgZD0iTTY3LjIsMTkuNGMtMC42LDAtMS4yLDAuMS0xLjcsMC4yTDE3LjgsMzYuMWMtMC45LDAuMy0xLjcsMS40LTEuNywyLjR2MTIuNgogIGMwLDEsMC44LDEuNywxLjgsMS41TDY1LjQsNDVjMC41LTAuMSwxLjEtMC4xLDEuOC0wLjFWMTkuNHoiPjwvcGF0aD4KPC9zdmc+",
    //     "dotsOptionsHelper": {
    //         "colorType": {
    //             "single": true,
    //             "gradient": false
    //         },
    //         "gradient": {
    //             "linear": true,
    //             "radial": false,
    //             "color1": "#6a1a4c",
    //             "color2": "#6a1a4c",
    //             "rotation": "0"
    //         }
    //     },
    //     "cornersSquareOptions": {
    //         "type": "extra-rounded",
    //         "color": "#f46f10",
    //         "gradient": null
    //     },
    //     "cornersSquareOptionsHelper": {
    //         "colorType": {
    //             "single": true,
    //             "gradient": false
    //         },
    //         "gradient": {
    //             "linear": true,
    //             "radial": false,
    //             "color1": "#000000",
    //             "color2": "#000000",
    //             "rotation": "0"
    //         }
    //     },
    //     "cornersDotOptions": {
    //         "type": "dot",
    //         "color": "#f46f10",
    //         "gradient": null
    //     },
    //     "cornersDotOptionsHelper": {
    //         "colorType": {
    //             "single": true,
    //             "gradient": false
    //         },
    //         "gradient": {
    //             "linear": true,
    //             "radial": false,
    //             "color1": "#000000",
    //             "color2": "#000000",
    //             "rotation": "0"
    //         }
    //     },
    //     "backgroundOptionsHelper": {
    //         "colorType": {
    //             "single": true,
    //             "gradient": false
    //         },
    //         "gradient": {
    //             "linear": true,
    //             "radial": false,
    //             "color1": "#ffffff",
    //             "color2": "#ffffff",
    //             "rotation": "0"
    //         }
    //     }
    // }

    /*
    let options = {
        "width": 1200,
        "height": 1200,
        "data": "https://hostdi.me/c/AG11?s=portafolio",
        "margin": 0,
        "qrOptions":
        {
            "typeNumber": "0",
            "mode": "Byte",
            "errorCorrectionLevel": "Q"
        },
        "imageOptions":
        {
            "hideBackgroundDots": true,
            "imageSize": 0.4,
            "margin": 0
        },
        "dotsOptions":
        {
            "type": "square",
            "color": "#000000"
        },
        "backgroundOptions":
        {
            "color": "rgba(255, 255, 255, 0)"
        },
        "image": null,
        "dotsOptionsHelper":
        {
            "colorType":
            {
                "single": true,
                "gradient": false
            },
            "gradient":
            {
                "linear": true,
                "radial": false,
                "color1": "#6a1a4c",
                "color2": "#6a1a4c",
                "rotation": "0"
            }
        },
        "cornersSquareOptions":
        {
            "type": "square",
            "color": "#000000"
        },
        "cornersSquareOptionsHelper":
        {
            "colorType":
            {
                "single": true,
                "gradient": false
            },
            "gradient":
            {
                "linear": true,
                "radial": false,
                "color1": "#000000",
                "color2": "#000000",
                "rotation": "0"
            }
        },
        "cornersDotOptions":
        {
            "type": "",
            "color": "#000000"
        },
        "cornersDotOptionsHelper":
        {
            "colorType":
            {
                "single": true,
                "gradient": false
            },
            "gradient":
            {
                "linear": true,
                "radial": false,
                "color1": "#000000",
                "color2": "#000000",
                "rotation": "0"
            }
        },
        "backgroundOptionsHelper":
        {
            "colorType":
            {
                "single": true,
                "gradient": false
            },
            "gradient":
            {
                "linear": true,
                "radial": false,
                "color1": "#ffffff",
                "color2": "#ffffff",
                "rotation": "0"
            }
        }
    }
    */
    //AGNUS
    let options = {
        "width": 1200, "height": 1200,
        "data": "https://hostdi.me/c/AG11?s=portafolio", "margin": 0, "qrOptions": { 
            "typeNumber": "0", "mode": "Byte", "errorCorrectionLevel": "Q" },
             "imageOptions": { 
                "hideBackgroundDots": true, "imageSize": 0.4, "margin": 13 }, "dotsOptions": { "type": "square", "color": "#000000" },
        "backgroundOptions": { "color": "rgba(255, 255, 255, 0)" },
        "image": "data:image/png;base64,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", "dotsOptionsHelper": { "colorType": { "single": true, "gradient": false }, "gradient": { "linear": true, "radial": false, "color1": "#6a1a4c", "color2": "#6a1a4c", "rotation": "0" } }, "cornersSquareOptions": { "type": "square", "color": "#c40d81" }, "cornersSquareOptionsHelper": { "colorType": { "single": true, "gradient": false }, "gradient": { "linear": true, "radial": false, "color1": "#000000", "color2": "#000000", "rotation": "0" } }, "cornersDotOptions": { "type": "dot", "color": "#c40d81" }, "cornersDotOptionsHelper": { "colorType": { "single": true, "gradient": false }, "gradient": { "linear": true, "radial": false, "color1": "#000000", "color2": "#000000", "rotation": "0" } }, "backgroundOptionsHelper": { "colorType": { "single": true, "gradient": false }, "gradient": { "linear": true, "radial": false, "color1": "#ffffff", "color2": "#ffffff", "rotation": "0" } }
    }

    // For canvas type
    const qrCodeImage = new QRCodeStyling({ nodeCanvas, /*this is required */ ...options });
    buffer = await qrCodeImage.getRawData("png");
    fs.writeFileSync("dataNFCQRAgnusPortafolio.png", buffer);

    // For svg type
    const qrCodeSvg = new QRCodeStyling({ jsdom: JSDOM, /* this is required */ type: "svg", ...options });
    bufferSVG = await qrCodeSvg.getRawData("svg");
    fs.writeFileSync("test2.svg", bufferSVG);

    // For svg type with the inner-image saved as a blob
    // (inner-image will render in more places but file will be larger)
    const qrCodeSvgWithBlobImage = new QRCodeStyling({
        jsdom: JSDOM, // this is required
        nodeCanvas, // this is required
        type: "svg",
        ...options,
        imageOptions: {
            saveAsBlob: true,
            crossOrigin: "anonymous",
            margin: 20
        }
    });

    bufferSVGBlog = await qrCodeSvgWithBlobImage.getRawData("svg");
    fs.writeFileSync("test3Blob.svg", bufferSVGBlog);


})()