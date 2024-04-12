import { resolve } from "path";

export const config = {
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
        include: resolve(__dirname, "../")
      },
      {
        test: /\.(ts|tsx)$/,
        loader: require.resolve("babel-loader"),
        options: {
          presets: [["react-app", { flow: false, typescript: true }]]
        }
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".tsx"]
  }
}