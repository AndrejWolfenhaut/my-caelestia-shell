#version 440

layout(location = 0) in vec2 qt_TexCoord0;
layout(location = 0) out vec4 fragColor;

layout(std140, binding = 0) uniform qt_Uniforms {
    // qt_Matrix and qt_Opacity must always be both present
    // if the built-in vertex shader is used.
    mat4 qt_Matrix;
    float qt_Opacity;
};
layout(binding = 1) uniform sampler2D source;

void main(void) {
    lowp float x, y;

    x = (qt_TexCoord0.x - 0.5);
    y = (qt_TexCoord0.y - 0.5);

    float delta = fwidth(x) / 2.0;
    
    fragColor = (
        texture(source, qt_TexCoord0).rgba *
        step(x * x + y * y, 0.25) *
        smoothstep(x * x + y * y, 0.25 + delta, 0.25) *
        qt_Opacity
    );
}