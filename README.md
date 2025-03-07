# MCP Login API

這是一個使用 Model-Controller-Provider (MCP) 架構實現的登入 API。MCP 是一種類似於 MVC 的模式，但更適合 API 開發，將業務邏輯從 Controller 中分離出來放到 Provider 中。

## 架構說明

- **Model**: 資料模型和資料庫交互
- **Controller**: 處理 HTTP 請求和回應
- **Provider**: 處理業務邏輯
- **Middleware**: 提供請求處理的中間功能
- **Config**: 應用配置
- **Utils**: 工具函數和常量

## 安裝和運行

1. 確保已安裝 Node.js

2. 克隆項目
```
git clone <repository-url>
```

3. 安裝依賴
```
cd mcp-login-api
npm install
```

4. 設置環境變數
編輯 `.env` 文件，根據需要修改配置

5. 確保已設定 Hostinger MySQL 資料庫連接信息在 .env 檔案中

6. 啟動服務器
```
npm run dev
```

## API 端點

### 用戶註冊
- **URL**: `/api/auth/register`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "username": "user123",
    "email": "user@example.com",
    "password": "password123"
  }
  ```

### 用戶登入
- **URL**: `/api/auth/login`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```

### 驗證 Token
- **URL**: `/api/auth/verify`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "token": "your-jwt-token"
  }
  ```

### 獲取當前用戶資料
- **URL**: `/api/auth/me`
- **Method**: `GET`
- **Headers**:
  ```
  Authorization: Bearer your-jwt-token
  ```

## 安全策略

- 密碼使用 bcrypt 進行哈希處理
- 使用 JWT 進行無狀態身份驗證
- 輸入驗證使用 Joi 進行
- 全局錯誤處理確保敏感信息不會洩露
- 使用速率限制防止暴力收對登入系統的收剰
- 生產環境中資料庫同步需要手動啟用