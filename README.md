# 顧客管理アプリ（Customer Management App）

React × Supabase を用いた小規模 CRM（顧客管理）アプリです。  
顧客情報の登録・編集・検索に加え、顧客ごとのメモ（対応履歴）を管理できます。

---

## 📌 機能概要

- 顧客一覧表示  
- 顧客検索（名前・メール・電話番号）  
- 顧客の新規登録  
- 顧客情報の編集・削除  
- 顧客詳細画面（基本情報＋メモ一覧）  
- メモ（対応履歴）の追加・編集・削除  
- 作成日・更新日によるソート  
- レスポンシブ対応  
- テーマ切り替え（ライト/ダーク）※任意  

---

## 🧱 データベース構造（Supabase）

### customers テーブル（顧客情報）

| カラム名        | 型            | 説明 |
|----------------|---------------|------|
| customer_id    | uuid (PK)     | 顧客ID（自動生成） |
| customer_name  | varchar(63)   | 顧客名 |
| email          | varchar(255)  | メールアドレス |
| phone          | varchar(20)   | 電話番号 |
| address        | text          | 住所 |
| created_at     | timestamp     | 作成日時（自動） |
| updated_at     | timestamp     | 更新日時 |

---

### customer_notes テーブル（顧客メモ・対応履歴）

| カラム名     | 型            | 説明 |
|--------------|---------------|------|
| note_id      | uuid (PK)     | メモID（自動生成） |
| customer_id  | uuid (FK)     | 顧客ID（customers.customer_id） |
| note_text    | text          | メモ内容 |
| created_at   | timestamp     | 作成日時（自動） |
| updated_at   | timestamp     | 更新日時 |

**リレーション設定（推奨）**  
- `customer_notes.customer_id → customers.customer_id`  
- ON DELETE CASCADE（顧客削除時にメモも削除）

---

## 🖥️ 画面構成

### 1. 顧客一覧（Customers List）
- 顧客の一覧表示  
- キーワード検索（名前・メール・電話）  
- ソート（作成日・更新日）  
- 顧客詳細へのリンク  
- 顧客追加ボタン  

### 2. 顧客詳細（Customer Detail）
- 顧客の基本情報表示  
- 顧客編集ボタン  
- 顧客削除ボタン  
- メモ一覧（時系列）  
- メモ追加ボタン  

### 3. 顧客追加（Add Customer）
- 顧客情報入力フォーム  
- 保存ボタン  

### 4. 顧客編集（Edit Customer）
- 顧客情報の編集フォーム  
- 保存ボタン  
- キャンセルボタン  

### 5. メモ追加（Add Note）
- メモ本文入力  
- 保存ボタン  

### 6. メモ編集（Edit Note）
- メモ本文編集  
- 保存ボタン  
- 削除ボタン  

---

## 🔧 使用技術

- React  
- Supabase（認証・DB・ストレージ）  
- React Router または Next.js  
- CSS Modules / Tailwind / CSS Variables  
- Git / GitHub  

---

## 📂 ディレクトリ構成（例）
src/
  components/
    CustomerList.jsx
    CustomerDetail.jsx
    CustomerForm.jsx
    NoteList.jsx
    NoteForm.jsx
  pages/
    customers/
      index.jsx
      [id].jsx
      new.jsx
      edit.jsx
    notes/
      new.jsx
      edit.jsx
  hooks/
    useCustomers.js
    useNotes.js
  lib/
    supabase.js
  styles/
    variables.css
    components.css
    

---

## 🚀 セットアップ手順

### 1. リポジトリをクローン

```bash
git clone https://github.com/yourname/customer-management-app.git
cd customer-management-app

パッケージインストール
npm install


了解しました。
README の セットアップ手順を追加した完全版 を、そのまま .md ファイルとして使える形式でまとめました。
内容は React × Supabase の顧客管理アプリを前提に、実務レベルで通用する構成にしています。

📄 README.md（完成版）
# 顧客管理アプリ（Customer Management App）

React × Supabase を用いた小規模 CRM（顧客管理）アプリです。  
顧客情報の登録・編集・検索に加え、顧客ごとのメモ（対応履歴）を管理できます。

---

## 📌 機能概要

- 顧客一覧表示  
- 顧客検索（名前・メール・電話番号）  
- 顧客の新規登録  
- 顧客情報の編集・削除  
- 顧客詳細画面（基本情報＋メモ一覧）  
- メモ（対応履歴）の追加・編集・削除  
- 作成日・更新日によるソート  
- レスポンシブ対応  
- テーマ切り替え（ライト/ダーク）※任意  

---

## 🧱 データベース構造（Supabase）

### customers テーブル（顧客情報）

| カラム名        | 型            | 説明 |
|----------------|---------------|------|
| customer_id    | uuid (PK)     | 顧客ID（自動生成） |
| customer_name  | varchar(63)   | 顧客名 |
| email          | varchar(255)  | メールアドレス |
| phone          | varchar(20)   | 電話番号 |
| address        | text          | 住所 |
| created_at     | timestamp     | 作成日時（自動） |
| updated_at     | timestamp     | 更新日時 |

---

### customer_notes テーブル（顧客メモ・対応履歴）

| カラム名     | 型            | 説明 |
|--------------|---------------|------|
| note_id      | uuid (PK)     | メモID（自動生成） |
| customer_id  | uuid (FK)     | 顧客ID（customers.customer_id） |
| note_text    | text          | メモ内容 |
| created_at   | timestamp     | 作成日時（自動） |
| updated_at   | timestamp     | 更新日時 |

**リレーション設定（推奨）**  
- `customer_notes.customer_id → customers.customer_id`  
- ON DELETE CASCADE（顧客削除時にメモも削除）

---

## 🖥️ 画面構成

### 1. 顧客一覧（Customers List）
- 顧客の一覧表示  
- キーワード検索（名前・メール・電話）  
- ソート（作成日・更新日）  
- 顧客詳細へのリンク  
- 顧客追加ボタン  

### 2. 顧客詳細（Customer Detail）
- 顧客の基本情報表示  
- 顧客編集ボタン  
- 顧客削除ボタン  
- メモ一覧（時系列）  
- メモ追加ボタン  

### 3. 顧客追加（Add Customer）
- 顧客情報入力フォーム  
- 保存ボタン  

### 4. 顧客編集（Edit Customer）
- 顧客情報の編集フォーム  
- 保存ボタン  
- キャンセルボタン  

### 5. メモ追加（Add Note）
- メモ本文入力  
- 保存ボタン  

### 6. メモ編集（Edit Note）
- メモ本文編集  
- 保存ボタン  
- 削除ボタン  

---

## 🔧 使用技術

- React  
- Supabase（認証・DB・ストレージ）  
- React Router または Next.js  
- CSS Modules / Tailwind / CSS Variables  
- Git / GitHub  

---

## 📂 ディレクトリ構成（例）


src/ components/ CustomerList.jsx CustomerDetail.jsx CustomerForm.jsx NoteList.jsx NoteForm.jsx pages/ customers/ index.jsx [id].jsx new.jsx edit.jsx notes/ new.jsx edit.jsx hooks/ useCustomers.js useNotes.js lib/ supabase.js styles/ variables.css components.css

---

## 🚀 セットアップ手順

### 1. リポジトリをクローン

```bash
git clone https://github.com/yourname/customer-management-app.git
cd customer-management-app



2. 依存パッケージをインストール
npm install



3. Supabase プロジェクトを作成
- https://supabase.com にアクセス
- 新規プロジェクトを作成
- Project API Keys を控えておく
- SQL Editor で以下のテーブルを作成


DB構成
顧客テーブル
create table customers_info (
  customer_id uuid primary key default gen_random_uuid(),
  customer_name varchar(63) not null,
  email varchar(255),
  phone varchar(20),
  address text,
  created_at timestamp default now(),
  updated_at timestamp
);

顧客詳細

create table customer_notes (
  note_id uuid primary key default gen_random_uuid(),
  customer_id uuid references customers(customer_id) on delete cascade,
  note_text text,
  created_at timestamp default now(),
  updated_at timestamp
);

4. 環境変数を設定
プロジェクト直下に .env を作成：
VITE_SUPABASE_URL=あなたのSupabase URL
VITE_SUPABASE_ANON_KEY=あなたのanon key

開発サーバーを起動
npm run dev

ブラウザで
http://localhost:5173
にアクセス


 今後の拡張案
- タグ管理（顧客分類）
- ステータス管理（見込み客 / 契約済み など）
- CSV エクスポート
- 顧客ごとのファイル添付（Supabase Storage）
- メール送信機能


