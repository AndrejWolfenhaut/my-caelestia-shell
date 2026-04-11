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
        x = qt_TexCoord0.x - 0.5f,
        y = qt_TexCoord0.y - 0.5f,
        halfMinusA = 0.5f - a,
        halfMinusB = 0.5f - b;
    
    vec4 color = texture(source, qt_TexCoord0).rgba * qt_Opacity;

    if (abs(x) > halfMinusA && abs(y) > halfMinusB) {
        float
            numX = x - sign(x) * halfMinusA,
            numY = y - sign(y) * halfMinusB,
            d = fwidth(x) * 0.5,
            e = (numX*numX) / (a*a) + (numY*numY) / (b*b),
            eFactor = step(e, 1.0f),
            eSmoothFactor = smoothstep(e, 1.0f + d, 1.0f);
        
        color *= eFactor * eSmoothFactor;
    }
    
    fragColor = color;
}