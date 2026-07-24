# 公開手順（rakkoアプリと同じ運用方式）

rakkoアプリと同じ構成で公開します。

- **ドメイン**：エックスサーバー（Xdomain）で取得
- **DNS**：エックスサーバーで A レコードを GitHub Pages に向ける
- **ホスティング**：GitHub Pages（無料）
- **デプロイ**：`git push` で公開・更新

ローカルの git リポジトリは初期化・コミット済みです（`main` ブランチ）。
残りは「ドメイン決定 → GitHub公開 → DNS設定」の3ステップです。

---

## ステップ0：ドメイン名 ✅ 確定済み

ドメインは **wolf-tenmonkan.com** に確定。サイト内の全URLと `CNAME` に反映済みです。

---

## ステップ1：エックスサーバーでドメインを取得【要・店舗側】

rakkoアプリと同じ `xdomain.ne.jp` で取得します。

1. エックスサーバーのアカウントにログイン（rakkoアプリと同じアカウントでOK）
2. 「ドメイン取得」で決めた名前を検索 → 取得
3. 支払いを完了

※ ドメイン取得は支払いが伴うため、店舗側で操作してください。

---

## ステップ2：GitHub に公開【こちらで代行可能】

`gh` が `rakko9924-tech` アカウントで認証済みなので、こちらでリポジトリ作成・
公開まで代行できます。ご指示があれば、以下を実行します。

```bash
# リポジトリを作成して push（公開リポジトリ）
gh repo create wolf-site --public --source=. --remote=origin --push

# GitHub Pages を main ブランチのルートで有効化
gh api -X POST repos/rakko9924-tech/wolf-site/pages \
  -f source.branch=main -f source.path=/
```

公開後、まずは `https://rakko9924-tech.github.io/wolf-site/` で表示確認できます。

---

## ステップ3：独自ドメインを繋ぐ

### 3-a. リポジトリに CNAME ファイルを置く【こちらで代行可能】

決めたドメインを書いた `CNAME` ファイルをリポジトリ直下に追加して push します。
（例：`wolf-tenmonkan.com` の1行だけのファイル）

### 3-b. エックスサーバーで DNS を設定【要・店舗側】

エックスサーバーのDNSレコード設定で、以下を登録します（rakkoアプリと同じ向き先）。

| 種別 | ホスト名 | 値 |
|---|---|---|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | rakko9924-tech.github.io |

反映まで数分〜数時間。GitHub Pages の設定で「Enforce HTTPS」を有効にすれば、
https で自動的に証明書が付きます。

---

## 以降の更新

ファイルを編集したら、これだけです。

```bash
git add -A
git commit -m "更新内容"
git push
```

push すると GitHub Pages が自動で再公開します。
