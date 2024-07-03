// displays the image based on the parent component's widht
// preserves the aspect ratio
import { 
    Image,
    StyleSheet,
    View
} from 'react-native'
import React from 'react'
import { ImageSource } from 'react-native-vector-icons/Icon'
import { useCallback, useState } from 'react'
import { LayoutChangeEvent } from 'react-native'
interface responsiveImageProps {
    source: ImageSource
}
const ResponsiveImage : React.FC<responsiveImageProps> = ({source}) =>{
    const [width, setWidth] = useState(0);
    const [heigth, setHeight] = useState(0);

    const onLayout = useCallback((event:LayoutChangeEvent) => {
        const containerWidth = event.nativeEvent.layout.width;
    
        if (source.ratio) {
          setWidth(containerWidth);
          setHeight(containerWidth * source.ratio);
        } else if (typeof source === "number") {
          const resolvedSource = Image.resolveAssetSource(source);
          setWidth(containerWidth);
          setHeight(containerWidth * resolvedSource.height / resolvedSource.width);
        } else if (typeof source === "object") {
          Image.getSize(source.uri, (w, h) => {
            setWidth(containerWidth);
            setHeight(containerWidth * h / w);
          });
        }
      }, [source]);
    return (
        <View onLayout={onLayout}>
            <Image
                resizeMode='contain'
                source={source}
                style ={{width:width, height: heigth}}
            />
        </View>
    )
}

export default ResponsiveImage

const styles = StyleSheet.create({
})