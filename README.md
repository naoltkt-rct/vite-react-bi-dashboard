# vite-react-bi-dashboard

BI ツールの管理画面を想定した実装を行なった練習用リポジトリです。

## Getting Started

### Prerequisites / 必要条件

```bash
nodejs v22.11.0
pnpm v9.12.3
```

### Installing / インストール

```bash
git@github.com:naoltkt-rct/vite-react-bi-dashboard.git
cd vite-react-bi-dashboard
pnpm i
```

## Starting the development. / 開発スタート

```Bash
pnpm dev
```

## 特記事項

API モックは`msw`、データの生成は`faker`を使用しています。
なお、データ自体は更新のたびに再生成されます。

API の仕様は`docs/openapi.yaml`に定義しています。

## 注意事項

このプロジェクトでは`pnpm`を使用しています。

他パッケージマネージャーを使用する場合、`pnpm-lock.yaml`を削除のうえ、お好みのパッケージマネージャーを使用してインストールを実行してください。

## 備考

「API 仕様書」は、VS Code の拡張機能「[OpenAPI (Swagger) Editor](https://marketplace.visualstudio.com/items?itemName=42Crunch.vscode-openapi)」をインストールのうえ、`docs/openapi.yaml`を開き、下記のリンク等を参考に閲覧してください。

- [Visual Studio Code で OpenAPI(Swagger) Editor を使用する](https://qiita.com/YoshijiGates/items/413be433c0ba33e8ef3a)
- [OpenAPI・Swagger でインタラクティブな API 仕様ドキュメントを作成する](https://zenn.dev/knm/articles/32106f623bd382)

「Linter, Formatter」は「[Biome](https://biomejs.dev/ja/)」を使用しています。ローカル環境でリアルタイムに実行させる場合は、VS Code の拡張機能「[Biome](https://marketplace.visualstudio.com/items?itemName=biomejs.biome)」をインストールしてください。
