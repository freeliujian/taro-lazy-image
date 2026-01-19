# 使用Taro react 编写的小程序懒加载图片

实现思路: 当大体积图片进行加载的时候，先使用模糊的小体积图片配合遮罩掩盖。

实现原理：使用 `createIntersectionObserver` 判断图片是否出现在视口中并进行加载

## 使用方式

### 下载

```
pnpm install taro-lazy-image
```

两种使用方式，一种hooks方法，一种使用组件

hooks：

```
import { useLazyLoad } from "taro-lazy-image";

const Test = () => {
    const bg = useLazyLoad(BgImg, {
      placeholder: BgPlaceholder,
    });
  return (
    <View
        className={classNames(`animationContainer`, bg.uniqueClass)}
        style={{
          backgroundImage: `url(${bg.currentSrc})`,
        }}
      />
  )
}
```

Component:

```
import { LazyImage }from "taro-lazy-image";

const Test = () => {
  return (
    <LazyImage
        src={`${BASE_URL}/image/规划背景图_1125_1569.png`}
        placeholder={`${BASE_URL}/image/规划背景图_placeholder.png`}
        mode="scaleToFill"
        styles={{
          width: "100%",
          height: "523px",
          display: "block",
        }}
        imageContainerClass="background-image-container"
      />
  )
}
```

