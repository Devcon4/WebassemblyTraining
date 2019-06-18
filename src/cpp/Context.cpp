#include "Context.h"

GLuint CompileShader(GLenum type, char* source) {

    const GLchar* sourceString[1];
    GLint sourceStringLengths[1];

    GLuint shader = glCreateShader(type);

    if(shader == 0) {
        return 0;
    }

    glShaderSource(shader, 1, sourceString, sourceStringLengths);
    glCompileShader(shader);

    int infoLen = 0;
    glGetShaderiv(shader, GL_INFO_LOG_LENGTH, &infoLen);

    if(infoLen > 1) {
        char infoLog[infoLen];

        glGetShaderInfoLog(shader, infoLen, NULL, infoLog);
        printf("%s\n", infoLog);
        free(infoLog);
    }

    return shader;
}

Context::Context (int w, int h, char* id, char* fragmentSource, char* vertexSource) {
    width = w;
    height = h;

    EmscriptenWebGLContextAttributes attrs;
    attrs.explicitSwapControl = 0;
    attrs.depth = 1;
    attrs.stencil = 1;
    attrs.antialias = 1;
    attrs.majorVersion = 2;
    attrs.minorVersion = 0;

    context = emscripten_webgl_create_context(id, &attrs);
    emscripten_webgl_make_context_current(context);

    fragmentShader = CompileShader(GL_FRAGMENT_SHADER, fragmentSource);
    vertexShader = CompileShader(GL_VERTEX_SHADER, vertexSource);

    programObject = glCreateProgram();
    glAttachShader(programObject, vertexShader);
    glAttachShader(programObject, fragmentShader);

    glBindAttribLocation(programObject, 0, "position");

    glLinkProgram(programObject);
    glValidateProgram(programObject);

}

Context::~Context (void) {
    emscripten_webgl_destroy_context(context);
}

void Context::run (uint8_t* buffer) {
    emscripten_webgl_make_context_current(context);
    glUseProgram(programObject);
    GLuint texId;
    GLuint vertexObject;
    GLuint indexObject;
    GLint positionLoc = glGetAttribLocation(programObject, "position");
    GLint texCoordLoc = glGetAttribLocation(programObject, "texCoord");
    GLint textureLoc = glGetAttribLocation(programObject, "texture");

    float widthUniform = glGetUniformLocation(programObject, "width");
    float heightUniform = glGetUniformLocation(programObject, "height");
    glUniform1f(widthUniform, (float) width);
    glUniform1f(heightUniform, (float) height);

    glGenTextures(1, &texId);
    glUniform1i(textureLoc, 0);

    glActiveTexture(GL_TEXTURE0);
    glBindTexture(GL_TEXTURE_2D, texId);
    glTexImage2D(GL_TEXTURE_2D, 0, GL_RGBA, width, height, 0, GL_RGBA, GL_UNSIGNED_BYTE, buffer);
    glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MIN_FILTER, GL_NEAREST);
    glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MAG_FILTER, GL_NEAREST);

    GLfloat vVertices[] = { -1.0, 1.0, 0.0, 0.0, -1.0, -1.0, 0.0, 0.0, 1.0,
                            1.0, -1.0, 0.0, 1.0, 1.0, 1.0, 1.0, 0.0, 1.0, 0.0};
    GLushort indices[] = { 0, 1, 2, 0, 2, 3 };

    glGenBuffers(1, &vertexObject);
    glBindBuffer(GL_ARRAY_BUFFER, vertexObject);
    glBufferData(GL_ARRAY_BUFFER, sizeof(vVertices), vVertices, GL_STATIC_DRAW);

    glVertexAttribPointer(positionLoc, 3, GL_FLOAT, GL_FALSE, 5 * sizeof(GLfloat), 0);
    glVertexAttribPointer(texCoordLoc, 2, GL_FLOAT, GL_FALSE, 5 * sizeof(GLfloat), (GLvoid*) (3 * sizeof(GLfloat)));

    glEnableVertexAttribArray(positionLoc);
    glEnableVertexAttribArray(texCoordLoc);

    glDrawElements(GL_TRIANGLES, 6, GL_UNSIGNED_SHORT, 0);
}