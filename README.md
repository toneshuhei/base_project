# Webアプリベースプロジェクト

個人開発や案件対応時に迅速にスタートできる**フルスタック構成の雛形（ベース）**です。拡張・カスタマイズを前提として、必要最低限の機能を備えた構成となっています。

## 🎯 プロジェクト概要

### 目的
- 新規プロジェクト開始時の環境構築時間を短縮
- 技術スタックの統一による開発効率の向上
- 再利用可能なベーステンプレートの提供
- 学習・実験用の環境として活用

### 主要機能
- **フロントエンド**: Next.js（React + TypeScript）によるモダンなWebアプリケーション
- **REST API**: FastAPIによる高速なAPI開発とOpenAPI自動ドキュメント生成
- **管理画面**: Djangoによる直感的な管理インターフェース
- **データベース**: PostgreSQLによる堅牢なデータ管理
- **開発環境**: Docker環境での一発起動とホットリロード対応

## 🛠️ 技術スタック

### フロントエンド
- **Next.js 14.x** - React + TypeScript
- **Tailwind CSS** - 効率的なスタイリング
- **App Router** - ファイルベースルーティング

### バックエンド
- **FastAPI 0.104.x** - Python 3.11+
  - Pydantic（データバリデーション）
  - Uvicorn（ASGIサーバー）
  - OpenAPI自動ドキュメント生成

- **Django 4.2.x** - Python 3.11+
  - Django Admin（管理画面）
  - Django ORM（データベース操作）

### データベース
- **PostgreSQL 15.x**
  - JSON型対応
  - 全文検索機能
  - 高性能なクエリ処理

### 開発環境
- **Docker & Docker Compose**
  - マルチコンテナ構成
  - 統一された開発環境
  - 一発起動とホットリロード

## 📁 プロジェクト構成

```
base_project/
├── frontend/                 # Next.jsプロジェクト
│   ├── src/
│   │   ├── app/             # App Router
│   │   ├── components/      # 再利用可能コンポーネント
│   │   └── lib/             # ユーティリティ・APIクライアント
│   ├── public/              # 静的ファイル
│   └── package.json
├── backend/
│   ├── fastapi/             # FastAPIプロジェクト
│   │   ├── app/
│   │   │   ├── api/         # APIエンドポイント
│   │   │   ├── models/      # Pydanticモデル
│   │   │   └── main.py      # エントリーポイント
│   │   └── requirements.txt
│   └── django/              # Djangoプロジェクト
│       ├── manage.py
│       ├── core/            # プロジェクト設定
│       ├── apps/            # Djangoアプリケーション
│       └── requirements.txt
├── db/
│   ├── init/                # 初期化SQL
│   └── data/                # データベースファイル
├── docker/
│   ├── Dockerfile.frontend
│   ├── Dockerfile.fastapi
│   ├── Dockerfile.django
│   └── docker-compose.yml
├── docs/                    # ドキュメント
├── scripts/                 # 開発用スクリプト
└── README.md               # このファイル
```

## 🚀 セットアップ方法

### 前提条件
- Docker Desktop
- Docker Compose
- Git

### 1. リポジトリのクローン
```bash
git clone <repository-url>
cd base_project
```

### 2. 環境の起動
```bash
# 全サービスを起動
docker-compose up

# バックグラウンドで起動する場合
docker-compose up -d

# ビルドを含めて起動する場合
docker-compose up --build
```

### 3. 起動確認
起動後、以下のURLにアクセスして動作確認を行ってください：

- **フロントエンド**: http://localhost:3000
- **FastAPI（OpenAPI）**: http://localhost:8000/docs
- **Django管理画面**: http://localhost:8001/admin
- **PostgreSQL**: localhost:5432

## 🔧 開発用コマンド

### Docker関連
```bash
# サービスの停止
docker-compose down

# 特定のサービスのログを確認
docker-compose logs frontend
docker-compose logs fastapi
docker-compose logs django
docker-compose logs postgres

# コンテナに入る
docker-compose exec frontend bash
docker-compose exec fastapi bash
docker-compose exec django bash
```

### Django関連
```bash
# マイグレーション実行
docker-compose exec django python manage.py migrate

# スーパーユーザー作成
docker-compose exec django python manage.py createsuperuser

# 静的ファイル収集
docker-compose exec django python manage.py collectstatic
```

### データベース関連
```bash
# PostgreSQLに接続
docker-compose exec postgres psql -U postgres -d base_project

# データベースの初期化
docker-compose exec postgres psql -U postgres -d base_project -f /docker-entrypoint-initdb.d/init.sql
```

## 🎨 各サービスの役割

### Frontend（Next.js）
- **ポート**: 3000
- **責務**: 
  - ユーザーインターフェース
  - API通信
  - クライアントサイドロジック

### FastAPI
- **ポート**: 8000
- **責務**:
  - 外部公開API
  - OpenAPI自動ドキュメント生成（/docs）
  - APIスキーマ管理
  - 外部システムとの連携

### Django
- **ポート**: 8001
- **責務**:
  - 管理画面（/admin）
  - バックエンド業務用UI
  - データモデル管理・ORM処理
  - 内部業務処理

### PostgreSQL
- **ポート**: 5432
- **責務**:
  - データ永続化
  - トランザクション管理
  - データ整合性保証

## 📋 開発フロー

1. **環境起動**: `docker-compose up`
2. **フロントエンド開発**: http://localhost:3000 でリアルタイム開発
3. **API開発**: http://localhost:8000/docs でAPIテスト
4. **管理画面操作**: http://localhost:8001/admin でデータ管理
5. **全サービス対応**: ホットリロードで効率的な開発

## 🧪 テスト・品質管理

### フロントエンド
- TypeScriptによる型安全性
- ESLint + Prettierによるコード品質統一

### バックエンド
- Pydanticによるデータバリデーション
- FastAPIの自動テスト生成
- Djangoのユニットテスト

### コード品質
- Conventional Commits準拠のコミットメッセージ
- Pythonコードのフォーマット統一

## 📈 拡張方法

### 新しいAPIエンドポイントの追加
1. `backend/fastapi/app/models/`にPydanticモデルを作成
2. `backend/fastapi/app/api/`にルートハンドラーを実装
3. `/docs`で自動生成されたドキュメントで動作確認

### 新しい管理機能の追加
1. `backend/django/apps/`に新しいDjangoアプリを作成
2. モデルを定義し、Django Adminに登録
3. マイグレーションを作成・実行

### フロントエンド機能の拡張
1. `frontend/src/components/`に新しいコンポーネントを作成
2. `frontend/src/lib/`にAPIクライアント関数を実装
3. `frontend/src/app/`に新しいページを追加

## 🔄 今後の拡張予定

### 短期（1-3ヶ月）
- [ ] 認証機能の強化
- [ ] 外部API連携サンプル
- [ ] テストコード追加
- [ ] エラーハンドリング改善

### 中期（3-6ヶ月）
- [ ] CI/CDパイプライン追加
- [ ] 本番環境デプロイ設定
- [ ] 監視・ログ機能
- [ ] パフォーマンス最適化

### 長期（6ヶ月以上）
- [ ] マイクロサービス化
- [ ] クラウドネイティブ対応
- [ ] 負荷分散・スケーリング対応

## 🐛 トラブルシューティング

### よくある問題と解決方法

**ポートが既に使用されている**
```bash
# 使用中のポートを確認
docker-compose ps
lsof -i :3000
lsof -i :8000
lsof -i :8001
lsof -i :5432

# Docker環境をリセット
docker-compose down
docker-compose up
```

**データベース接続エラー**
```bash
# PostgreSQLコンテナの状態確認
docker-compose logs postgres

# データベースの再初期化
docker-compose down -v
docker-compose up
```

**Node.js依存関係の問題**
```bash
# フロントエンドコンテナを再ビルド
docker-compose build frontend
docker-compose up frontend
```

## 📚 参考資料

- [Next.js公式ドキュメント](https://nextjs.org/docs)
- [FastAPI公式ドキュメント](https://fastapi.tiangolo.com/)
- [Django公式ドキュメント](https://docs.djangoproject.com/)
- [PostgreSQL公式ドキュメント](https://www.postgresql.org/docs/)
- [Docker Compose公式ドキュメント](https://docs.docker.com/compose/)

## 🤝 コントリビューション

1. このリポジトリをフォーク
2. 新しいブランチを作成（`git checkout -b feature/new-feature`）
3. 変更をコミット（`git commit -am 'Add some feature'`）
4. ブランチにプッシュ（`git push origin feature/new-feature`）
5. プルリクエストを作成

## 📄 ライセンス

このプロジェクトはMITライセンスの下で公開されています。詳細は[LICENSE](LICENSE)ファイルをご確認ください。

---

**作成日**: 2025年6月  
**バージョン**: 1.0  
**メンテナー**: 登根 周平