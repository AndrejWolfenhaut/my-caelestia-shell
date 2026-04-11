import QtQuick
import Quickshell

AnimatedImage {
    id: roundedImage

    property real radius: Math.min(width, height) / 2

    layer.enabled: true
    layer.effect: ShaderEffect {
        id: roundedImageEffect

        property real radius: roundedImage.radius

        property Image source: roundedImage
        property real a: radius / source.width
        property real b: radius / source.height

        fragmentShader: Quickshell.shellPath("assets/shaders/roundedImage.frag.qsb")
    }
}