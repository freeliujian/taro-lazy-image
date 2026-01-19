import React from "react";
import { View, Image, ImageProps } from "@tarojs/components";
import classNames from "classnames";
import { useLazyLoad } from "../../hooks/useLazyLoad.hook";
import "./index.scss";

interface IViewport {
  bottom?: number;
  left?: number;
  right?: number;
  top?: number;
}

interface IProps {
  src: string;
  placeholder?: string;
  mode?: keyof ImageProps.Mode;
  webp?: boolean;
  showMenuByLongpress?: boolean;
  styles?: React.CSSProperties;
  viewport?: IViewport;
  onLoad?: (event: any) => void;
  onError?: (event: any) => void;
  imageClass?: string;
  imageContainerClass?: string;
}

const LazyImage: React.FC<IProps> = (props) => {
  const {
    src,
    placeholder = "",
    mode = "scaleToFill",
    webp = false,
    showMenuByLongpress = false,
    styles = {},
    viewport = { bottom: 0 },
    onLoad = () => {},
    onError = () => {},
    imageClass = "",
    imageContainerClass = "",
  } = props;

  const { uniqueClass, currentSrc, isVisible } = useLazyLoad(src, {
    viewport,
    placeholder,
  });

  const handleError = (e: any) => {
    if (isVisible) {
      onError({ detail: e.detail });
    }
  };

  const handleLoad = (e: any) => {
    if (isVisible) {
      onLoad({ detail: e.detail });
    }
  };

  return (
    <View
      className={classNames("lazyImageComp", imageContainerClass, uniqueClass)}
    >
      {currentSrc ? (
        <Image
          style={styles}
          className={classNames(imageClass, {
            finalImage: isVisible,
            previewImage: !isVisible,
          })}
          src={currentSrc}
          mode={mode}
          webp={webp}
          showMenuByLongpress={showMenuByLongpress}
          onLoad={handleLoad}
          onError={handleError}
        />
      ) : null}
    </View>
  );
};

export default LazyImage;
