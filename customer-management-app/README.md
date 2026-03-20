# 顧客管理アプリ（Customer Management App）

React × Supabase を用いた小規模 CRM（顧客管理）アプリです。  
顧客情報の登録・編集・検索に加え、顧客ごとのメモ（対応履歴）を管理できます。

---

## 📌 機能概要

- ✅ 顧客一覧表示  
- ✅ 顧客検索（名前・メール・電話番号）  
- ✅ 顧客の新規登録  
- ✅ 顧客情報の編集・削除  
- ✅ 顧客詳細画面（基本情報＋メモ一覧）  
- ✅ メモ（対応履歴）の追加・編集・削除  
- ✅ 名前・作成日・更新日によるソート  
- ✅ レスポンシブ対応  
- ✅ テーマ切り替え（ライト/ダーク）  

---

## 🧱 データベース構造（Supabase）

### customers_info テーブル（顧客情報）

| カラム名        | 型            | 説明 |
|----------------|---------------|------|
| customer_id    | uuid (PK)     | 顧客ID（自動生成） |
| customer_name  | varchar(63)   | 顧客名 |
| email          | varchar(255)  | メールアドレス |
| phone          | varchar(20)   | 電話番号 |
| address        | text          | 住所 |
| created_at     | timestamp     | 作成日時（自動） |
| updated_at     | timestamp     | 更新日時 |

### customer_notes テーブル（顧客メモ・対応履歴）

| カラム名     | 型            | 説明 |
|--------------|---------------|------|
| note_id      | uuid (PK)     | メモID（自動生成） |
| customer_id  | uuid (FK)     | 顧客ID（customers.customer_id） |
| note_text    | text          | メモ内容 |
| created_at   | timestamp     | 作成日時（自動） |
| updated_at   | timestamp     | 更新日時 |

**リレーション設定**  
- `customer_notes.customer_id → customers_info.customer_id`  
- ON DELETE CASCADE（顧客削除時にメモも削除）

---

## 🖥️ 画面構成

### 1️⃣ 顧客一覧（Customers List）
- 顧客の一覧表示  
- キーワード検索（名前・メール・電話）  
- ソート（作成日・更新日）  
- 顧客詳細へのリンク  
- 顧客追加ボタン  

### 2️⃣ 顧客詳細（Customer Detail）
- 顧客の基本情報表示  
- 顧客編集ボタン  
- 顧客削除ボタン  
- メモ一覧（時系列）  
- メモ追加ボタン  

### 3️⃣ 顧客追加・編集（Customer Form）
- 顧客情報入力フォーム  
- バリデーション機能
- 保存・キャンセルボタン  

### 4️⃣ メモ管理（Notes）
- メモ一覧表示（時系列）
- メモ追加・編集・削除
- タイムスタンプ表示

---

| **Frontend** | React 18, TypeScript, Vite |
| **Backend** | Supabase (PostgreSQL) |
| **Routing** | React Router v6 |
| **Styling** | CSS Variables, Tailwind CSS |
| **Tools** | Git, GitHub, ESLint |
| **状態管理** | React Hooks (useState, useEffect, useMemo) |
| **ページネーション** | 自作コンポーネント |
  
---

## 🔧 技術スタック

| カテゴリ | 技術 |
|---------|------|
| **Frontend** | React 18, TypeScript, Vite |
| **Backend** | Supabase (PostgreSQL) |
| **Routing** | React Router v6 |
| **Styling** | CSS Variables, Tailwind CSS |
| **Tools** | Git, GitHub, ESLint |


---

## 📂 ディレクトリ構成

```
customer-management-app/
├── README.md
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── index.html
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Navbar.tsx
│   │   │   ├── Pagination.tsx
│   │   │   └── SortOptions.tsx
│   │   ├── customers/
│   │   │   ├── CustomerList.tsx
│   │   │   ├── CustomerDetail.tsx
│   │   │   ├── CustomerForm.tsx
│   │   │   └── CustomerCard.tsx
│   │   └── notes/
│   │       ├── NoteList.tsx
│   │       ├── NoteForm.tsx
│   │       └── NoteItem.tsx
│   ├── pages/
│   │   ├── CustomerListPage.tsx
│   │   │   ├── CustomerDetailPage.tsx
│   │   ├── CustomerFormPage.tsx
│   │   └── NotFoundPage.tsx
│   ├── hooks/
│   │   ├── useCustomers.ts
│   │   ├── useNotes.ts
│   │   ├── useTheme.ts
│   │   └── useForm.ts
│   ├── lib/
│   │   ├── supabase.ts
│   │   ├── api.ts
│   │   └── utils.ts
│   ├── types/
│   │   └── index.ts
│   ├── styles/
│   │   ├── globals.css
│   │   ├── variables.css
│   │   └── animations.css
│   ├── App.tsx
│   ├── main.tsx
│   └── vite-env.d.ts
└── .env.example
```

---

## 🚀 セットアップ手順

### 前提条件
- Node.js v18以上
- npm v9以上
- Supabaseアカウント

### 1️⃣ リポジトリをクローン

```bash
git clone https://github.com/kiyo022/portfolio.git
cd portfolio/customer-management-app
```

### 2️⃣ 依存パッケージをインストール

```bash
npm install
```

### 3️⃣ Supabase プロジェクトを作成

1. https://supabase.com にアクセス
2. 新規プロジェクトを作成
3. Project API Keys を控えておく
4. SQL Editor でテーブルを作成

**顧客テーブル:**
```sql
create table customers_info (
  customer_id uuid primary key default gen_random_uuid(),
  customer_name varchar(63) not null,
  email varchar(255),
  phone varchar(20),
  address text,
  created_at timestamp default now(),
  updated_at timestamp
);
```

**メモテーブル:**
```sql
create table customer_notes (
  note_id uuid primary key default gen_random_uuid(),
  customer_id uuid references customers_info(customer_id) on delete cascade,
  note_text text,
  created_at timestamp default now(),
  updated_at timestamp
);
```

### 4️⃣ 環境変数を設定

プロジェクト直下に `.env` ファイルを作成：

```env
VITE_SUPABASE_URL=<YOUR_SUPABASE_URL>
VITE_SUPABASE_ANON_KEY=<YOUR_SUPABASE_ANON_KEY>
```

`.env.example` ファイルを参考にしてください。

### 5️⃣ 開発サーバーを起動

```bash
npm run dev
```

ブラウザで `http://localhost:5173` にアクセスしてください。

---

## 📦 ビルド

### 開発ビルド
```bash
npm run dev
```

### 本番ビルド
```bash
npm run build
```

### ビルド結果のプレビュー
```bash
npm run preview
```

---

## 🎨 スタイルガイド

このプロジェクトは [Design System](../UIFRAME.md) に従っています。

---

## 📖 使用方法

### 1. 顧客一覧画面の表示と検索
1.トップページにアクセスすると、登録済み顧客の一覧が表示されます。
2.検索ボックスに「顧客名」「メール」「電話番号」を入力して検索可能
3.ソートドロップダウンで「名前」「作成日」「更新日」でソート可能
<img width="1299" height="637" alt="image" src="https://github.com/user-attachments/assets/26922e91-cf9e-4283-ab75-0d0b82a8cbef" />
### 2. 新規顧客追加画面（顧客の新規登録）
1.「新規追加」ボタンのクリック
2.顧客情報を入力フォームに入力
3.「保存」ボタンをクリック
4.顧客一覧に追加される
<img width="766" height="808" alt="image" src="https://github.com/user-attachments/assets/e1fc38fc-1d0c-41f9-a5c9-9a1efff2812f" />
### 3. 顧客詳細の表示（顧客詳細画面）
1.一覧から顧客をクリック
2.顧客の詳細情報とメモ一覧が表示される
<img width="1321" height="930" alt="image" src="https://github.com/user-attachments/assets/b4c9bb15-bafb-41f4-b3db-71f2eb266d8a" />
### 4. メモの管理
1.顧客詳細画面でメモを追加
2.対応履歴を時系列で記録できる
<img width="841" height="811" alt="image" src="https://github.com/user-attachments/assets/92de9ad6-548e-42ac-ab22-87278440410a" />

### 5. テーマの切り替え
　- Navbarの「🌙」アイコンをクリックしてテーマを切り替え可能


---

## 🔄 今後の拡張案

- [ ] タグ管理（顧客分類）
- [ ] ステータス管理（見込み客 / 契約済み など）
- [ ] CSV エクスポート機能、インポート機能
- [ ] 顧客ごとのファイル添付（Supabase Storage）
- [ ] メール送信機能
- [ ] ユーザー認証機能
- [ ] 複数ユーザー対応
- [ ] アナリティクスダッシュボード

---

## 📝 ライセンス

このプロジェクトはMITライセンスの下に公開されています。

---

## 🤝 コントリビューション

バグ報告や改善提案は、GitHubのIssuesセクションからお願いします。
