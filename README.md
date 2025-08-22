# متجر التيشرتات - T-Shirt Store

متجر تي شيرت متكامل باللغة العربية مع تصميم عصري ومتجاوب.

## المميزات

### 🌐 اللغة والتصميم
- **اللغة العربية**: واجهة كاملة باللغة العربية مع دعم RTL
- **ألوان أبيض وأسود**: تصميم كلاسيكي وأنيق
- **الوضع الداكن**: دعم كامل للوضع الداكن مع إمكانية التبديل
- **تصميم متجاوب**: يعمل على جميع الأجهزة والشاشات

### 🛍️ المنتجات
- **عرض شبكي**: منتجان في الصف على الشاشات الكبيرة
- **صور متعددة**: كل منتج يحتوي على عدة صور
- **مقاسات متعددة**: XS, S, M, L, XL, XXL
- **ألوان متنوعة**: أبيض، أسود، رمادي، كحلي، أحمر، أخضر، أزرق، وردي
- **أسعار بالجنيه المصري**: عرض واضح للأسعار

### 🎯 الوظائف
- **تصفح المنتجات**: تصفية حسب الفئة (رجالي/حريمي)
- **البحث**: البحث في المنتجات
- **سلة التسوق**: إضافة وإزالة المنتجات
- **إتمام الطلب**: نموذج طلب متكامل
- **إدارة الكمية**: تعديل كميات المنتجات

### 🚚 الشحن والتوصيل
- **محافظات مصر**: القاهرة، الجيزة، الإسكندرية
- **مدن متعددة**: لكل محافظة عدة مدن
- **شحن سريع**: توصيل خلال 3-5 أيام عمل

## التقنيات المستخدمة

- **Frontend**: React 19 + Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **UI Components**: Radix UI
- **Routing**: React Router DOM

## التثبيت والتشغيل

### المتطلبات
- Node.js 18+
- pnpm (مفضل) أو npm

### خطوات التثبيت

1. **استنساخ المشروع**
```bash
git clone <repository-url>
cd tshirt-store
```

2. **تثبيت التبعيات**
```bash
pnpm install
# أو
npm install
```

3. **تشغيل المشروع**
```bash
pnpm dev
# أو
npm run dev
```

4. **فتح المتصفح**
```
http://localhost:5173
```

### بناء المشروع للإنتاج
```bash
pnpm build
# أو
npm run build
```

## هيكل المشروع

```
src/
├── components/
│   ├── cart/           # مكونات سلة التسوق
│   ├── checkout/       # مكونات إتمام الطلب
│   ├── landing/        # مكونات الصفحة الرئيسية
│   ├── layout/         # مكونات التخطيط (Navbar, Footer)
│   ├── product/        # مكونات المنتجات
│   └── ui/             # مكونات واجهة المستخدم
├── data/               # بيانات المنتجات والمحافظات
├── hooks/              # React Hooks
├── lib/                # مكتبات مساعدة
└── assets/             # الصور والملفات الثابتة
```

## الملفات الرئيسية

- **`src/App.jsx`**: المكون الرئيسي للتطبيق
- **`src/data/products.js`**: بيانات المنتجات والمحافظات
- **`src/components/product/ProductGrid.jsx`**: عرض شبكي للمنتجات
- **`src/components/product/ProductCard.jsx`**: بطاقة منتج فردية
- **`src/components/cart/CartPage.jsx`**: صفحة سلة التسوق
- **`src/components/checkout/CheckoutPage.jsx`**: صفحة إتمام الطلب

## التخصيص

### ربط API

لربط المشروع مع API خارجي، قم بإنشاء ملف `src/services/api.js`:

```javascript
// src/services/api.js
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://your-api-domain.com/api'

export const apiService = {
  // جلب جميع المنتجات
  async getProducts() {
    try {
      const response = await fetch(`${API_BASE_URL}/products`)
      if (!response.ok) throw new Error('فشل في جلب المنتجات')
      return await response.json()
    } catch (error) {
      console.error('خطأ في API:', error)
      throw error
    }
  },

  // جلب منتج واحد
  async getProduct(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/products/${id}`)
      if (!response.ok) throw new Error('فشل في جلب المنتج')
      return await response.json()
    } catch (error) {
      console.error('خطأ في API:', error)
      throw error
    }
  },

  // إرسال طلب جديد
  async createOrder(orderData) {
    try {
      const response = await fetch(`${API_BASE_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
      })
      if (!response.ok) throw new Error('فشل في إنشاء الطلب')
      return await response.json()
    } catch (error) {
      console.error('خطأ في API:', error)
      throw error
    }
  },

  // جلب المحافظات والمدن
  async getGovernorates() {
    try {
      const response = await fetch(`${API_BASE_URL}/governorates`)
      if (!response.ok) throw new Error('فشل في جلب المحافظات')
      return await response.json()
    } catch (error) {
      console.error('خطأ في API:', error)
      throw error
    }
  }
}
```

#### متغيرات البيئة

قم بإنشاء ملف `.env` في مجلد المشروع:

```env
# .env
REACT_APP_API_URL=https://your-api-domain.com/api
REACT_APP_API_KEY=your-api-key-here
```

#### استخدام API في المكونات

```javascript
// في ProductGrid.jsx
import { apiService } from '../../services/api'

const ProductGrid = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await apiService.getProducts()
        setProducts(data)
      } catch (error) {
        console.error('خطأ في جلب المنتجات:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  // ... باقي الكود
}
```

#### هيكل API المتوقع

```json
// GET /api/products
{
  "products": [
    {
      "id": 1,
      "name": "تيشرت رجالي أبيض كلاسيكي",
      "price": 299,
      "category": "men",
      "images": ["url1", "url2", "url3"],
      "description": "وصف المنتج",
      "availableSizes": ["s", "m", "l", "xl"],
      "availableColors": ["white", "black", "gray"],
      "defaultSize": "m",
      "defaultColor": "white"
    }
  ]
}

// POST /api/orders
{
  "customer": {
    "firstName": "أحمد",
    "lastName": "محمد",
    "phone": "01012345678",
    "email": "ahmed@example.com",
    "governorate": "cairo",
    "city": "nasr_city",
    "address": "العنوان التفصيلي"
  },
  "items": [
    {
      "productId": 1,
      "size": "m",
      "color": "white",
      "quantity": 2
    }
  ],
  "totalAmount": 598,
  "shippingCost": 50
}
```

### إضافة منتجات جديدة
قم بتعديل ملف `src/data/products.js` وإضافة منتجات جديدة:

```javascript
{
  id: 8,
  name: 'تيشرت جديد',
  price: 350,
  category: 'men', // أو 'women'
  images: [image1, image2, image3],
  description: 'وصف المنتج',
  availableSizes: ['s', 'm', 'l', 'xl'],
  availableColors: ['white', 'black', 'gray'],
  defaultSize: 'm',
  defaultColor: 'white'
}
```

### إضافة محافظات جديدة
```javascript
{
  id: 'new-governorate',
  name: 'اسم المحافظة',
  cities: [
    { id: 'city1', name: 'اسم المدينة' },
    { id: 'city2', name: 'اسم المدينة' }
  ]
}
```

## المساهمة

نرحب بمساهماتكم! يرجى:

1. عمل Fork للمشروع
2. إنشاء branch جديد للميزة
3. عمل Commit للتغييرات
4. عمل Push للbranch
5. إنشاء Pull Request

## الترخيص

هذا المشروع مرخص تحت رخصة MIT.

## الدعم

إذا واجهت أي مشاكل أو لديك أسئلة، يرجى:

- فتح Issue جديد
- التواصل معنا عبر البريد الإلكتروني
- مراجعة الوثائق

---

**تم التطوير بـ ❤️ للعالم العربي**
#   A u r a - v 1  
 