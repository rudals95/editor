import { defineConfig } from "vite";
import { createHtmlPlugin } from "vite-plugin-html";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    react(),
    createHtmlPlugin({
      minify: true,
      inject: {
        data: {
          title:
            process.env.NODE_ENV === "development"
              ? "이미지 에디터(개발)"
              : "이미지 에디터",
        },
      },
    }),
  ],
  build: {
    outDir: "dist", // 빌드 결과물이 저장될 폴더 경로
    assetsDir: "assets", // 빌드 결과물에 포함될 정적 파일들이 저장될 폴더 경로
    assetsInlineLimit: 4096,
    // sourcemap: true, // 소스맵 사용 여부
    minify: "esbuild", // 코드 압축 방식 (terser, esbuild)
  },
  server: {
    port: 8080, // 개발 서버 포트 번호
    open: true, // 개발 서버 실행 시 브라우저 자동으로 열기 여부
  },
  define: {
    "process.env": process.env,
  },
  resolve: {
    // alias: {
    //   "@": "/src", // @ 기호로 import 시 src 폴더 경로를 사용할 수 있음
    // },
    extensions: [".js", ".jsx", ".json"], // import 시 확장자 생략 가능하도록 지정
  },
});
