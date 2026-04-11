#version 440

layout(location = 0) in vec2 qt_TexCoord0;
layout(location = 0) out vec4 fragColor;

layout(std140, binding = 0) uniform qt_Uniforms {
    // qt_Matrix and qt_Opacity must always be both present
    // if the built-in vertex shader is used.
    mat4 qt_Matrix;
    float qt_Opacity;
    float a;
    float b;
};
layout(binding = 1) uniform sampler2D source;


void main(void) {
    float
        x = (qt_TexCoord0.x - 0.5),
        y = (qt_TexCoord0.y - 0.5),
        oneMinusA = 1.0f - a,
        oneMinusB = 1.0f - b;
    
    vec4 color = texture(source, qt_TexCoord0).rgba * qt_Opacity;

    if (abs(x) > oneMinusA && abs(y) > oneMinusB) {
        float
            numX = x - sign(x) * oneMinusA,
            numY = y - sign(y) * oneMinusB,
            e = ((numX*numX) / (a*a)) + ((numY*numY) / (b*b)),
            eFactor = e <= 1.0f ? 1.0f : 0.0f;
        
        color *= eFactor;
    }
    
    fragColor = color;
}