class Context {
    public:
        Context (int width, int height, char* id, char* fragmentSource, char* vertexSource);
        ~Context (void);
        void run(uint8_t* buffer);

    private:
        int width;
        int height;
        GLuint programObject;
        GLuint vertexShader;
        GLuint fragmentShader;

        EMSCRIPTEN_WEBGL_CONTEXT_HANDLE context;

};