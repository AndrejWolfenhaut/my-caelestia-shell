import QtQuick
import Quickshell

AnimatedImage {
    id: roundedImage

    property real radius: Math.min(width, height) / 2.0

    layer.enabled: true
    layer.effect: ShaderEffect {
        id: roundedImageEffect

        property real radius: {
            const preferredRadius = roundedImage.radius;
            const maxRadius = Math.min(source.width, source.height) / 2.0;

            return Math.min(Math.max(preferredRadius, 0.0), maxRadius);
        }

        property Image source: roundedImage
        property real a: radius / source.width
        property real b: radius / source.height

        fragmentShader: Quickshell.shellPath("assets/shaders/roundedImage.frag.qsb")
    }
}