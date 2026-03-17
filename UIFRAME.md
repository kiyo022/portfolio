# 🎨 Design System & UI Framework

このドキュメントは、ポートフォリオ全体のプロジェクトで使用される統一的なデザインシステムとUI/UXガイドラインを定義しています。

---

## 🎯 設計原則

1. **シンプル**: 不必要な複雑さを排除し、清潔でシンプルなデザイン
2. **一貫性**: 全プロジェクトで統一的なUIコンポーネント
3. **アクセシビリティ**: WCAG準拠のアクセシブルなデザイン
4. **レスポンシブ**: すべてのデバイスで最適な表示
5. **パフォーマンス**: 軽量で高速なUI

---

## 🎨 カラーパレット

### 基本カラー
```css
/* Primary Colors */
--color-primary-50: #f0f9ff;
--color-primary-100: #e0f2fe;
--color-primary-200: #bae6fd;
--color-primary-500: #0ea5e9;
--color-primary-600: #0284c7;
--color-primary-700: #0369a1;
--color-primary-900: #082f49;

/* Success */
--color-success-500: #10b981;
--color-success-600: #059669;

/* Warning */
--color-warning-500: #f59e0b;
--color-warning-600: #d97706;

/* Danger/Error */
--color-danger-500: #ef4444;
--color-danger-600: #dc2626;

/* Neutral */
--color-gray-50: #f9fafb;
--color-gray-100: #f3f4f6;
--color-gray-200: #e5e7eb;
--color-gray-300: #d1d5db;
--color-gray-400: #9ca3af;
--color-gray-500: #6b7280;
--color-gray-600: #4b5563;
--color-gray-700: #374151;
--color-gray-800: #1f2937;
--color-gray-900: #111827;
```

### ダークモード
```css
/* Dark Mode */
--dark-bg-primary: #111827;
--dark-bg-secondary: #1f2937;
--dark-text-primary: #f3f4f6;
--dark-text-secondary: #d1d5db;
```

---

## 🔤 タイポグラフィ

### フォント
```css
--font-family-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
--font-family-mono: 'Courier New', Courier, monospace;
```

### フォントサイズ
```css
--text-xs: 0.75rem;     /* 12px */
--text-sm: 0.875rem;    /* 14px */
--text-base: 1rem;      /* 16px */
--text-lg: 1.125rem;    /* 18px */
--text-xl: 1.25rem;     /* 20px */
--text-2xl: 1.5rem;     /* 24px */
--text-3xl: 1.875rem;   /* 30px */
--text-4xl: 2.25rem;    /* 36px */
```

### フォントウェイト
```css
--font-weight-light: 300;
--font-weight-normal: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;
```

### 行高
```css
--line-height-tight: 1.25;
--line-height-normal: 1.5;
--line-height-relaxed: 1.75;
```

---

## 📏 スペーシングシステム

8pxベースのスペーシングスケール:

```css
--spacing-0: 0;
--spacing-1: 0.25rem;   /* 4px */
--spacing-2: 0.5rem;    /* 8px */
--spacing-3: 0.75rem;   /* 12px */
--spacing-4: 1rem;      /* 16px */
--spacing-6: 1.5rem;    /* 24px */
--spacing-8: 2rem;      /* 32px */
--spacing-10: 2.5rem;   /* 40px */
--spacing-12: 3rem;     /* 48px */
--spacing-16: 4rem;     /* 64px */
--spacing-20: 5rem;     /* 80px */
```

---

## 🎯 コンポーネント標準

### ボタン

#### プライマリボタン
- 背景: primary-600
- テキスト: white
- パディング: spacing-2 spacing-4
- ボーダーラジアス: 6px
- ホバー状態: primary-700

#### セカンダリボタン
- 背景: gray-100
- テキスト: gray-900
- ボーダー: 1px solid gray-300
- ホバー状態: gray-200

#### ダンジャーボタン
- 背景: danger-500
- テキスト: white
- ホバー状態: danger-600

### 入力フィールド
- パディング: spacing-2 spacing-3
- ボーダー: 1px solid gray-300
- ボーダーラジアス: 6px
- フォーカス時: border-primary-500, box-shadow

### カード
- 背景: white
- ボーダー: 1px solid gray-200
- ボーダーラジアス: 8px
- パディング: spacing-4
- シャドウ: 0 1px 3px rgba(0, 0, 0, 0.1)

---

## 📱 レスポンシブデザイン

### ブレークポイント
```css
/* Mobile First */
--bp-sm: 640px;   /* Small devices */
--bp-md: 768px;   /* Tablets */
--bp-lg: 1024px;  /* Laptops */
--bp-xl: 1280px;  /* Desktops */
--bp-2xl: 1536px; /* Large screens */
```

### グリッドシステム
- 12カラムグリッド
- ガッター: spacing-4 (16px)
- マックスコンテナ: 1200px

---

## ⚡ アニメーション

### トランジション
```css
--transition-fast: 150ms ease-in-out;
--transition-base: 200ms ease-in-out;
--transition-slow: 300ms ease-in-out;
```

### イージング関数
```css
--easing-linear: linear;
--easing-ease: ease;
--easing-ease-in: cubic-bezier(0.4, 0, 1, 1);
--easing-ease-out: cubic-bezier(0, 0, 0.2, 1);
--easing-ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
```

---

## ♿ アクセシビリティ

### WCAG準拠
- コントラスト比: 4.5:1以上（通常テキスト）
- フォーカスインジケーター: 常に表示
- キーボードナビゲーション: 全機能対応
- スクリーンリーダー対応: ARIAラベル使用

### 実装例
```html
<!-- フォーカスインジケーター -->
<button class="focus:outline-2 focus:outline-offset-2 focus:outline-primary-500">
  Button
</button>

<!-- ARIAラベル -->
<button aria-label="メニューを開く">☰</button>
```

---

## 🌓 ダークモード

CSS変数を使用したテーマ切り替え:

```css
@media (prefers-color-scheme: dark) {
  :root {
    --bg-primary: var(--dark-bg-primary);
    --bg-secondary: var(--dark-bg-secondary);
    --text-primary: var(--dark-text-primary);
    --text-secondary: var(--dark-text-secondary);
  }
}
```

---

## 📐 よく使うCSS

### フレックスボックス
```css
.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.flex-between {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
```

### グリッド
```css
.grid-auto {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-4);
}
```

### テキスト省略
```css
.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
```

---

## 🎯 使用例

各プロジェクトで、このデザインシステムを以下の方法で使用してください:

1. **CSS変数**: 色やスペーシングは常にCSS変数を使用
2. **統一性**: すべてのコンポーネントで統一的なスタイルを適用
3. **拡張性**: 必要に応じてカスタマイズ可能だが、基本原則は守る
4. **ドキュメント化**: 新しいコンポーネントを追加したら、ここに記載

---

## 📚 参考資料

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [CSS Variables](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)
- [Responsive Design](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design)