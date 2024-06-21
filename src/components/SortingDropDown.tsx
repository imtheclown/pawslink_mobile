// to have multiple dropdown lists, import multifilter container
// to have a single dropdown list, import sorting dropdown
// currently, multiple dropdown list supports at most 4 filters in row direction
import { 
    View,
    Text,
    StyleSheet
 } from "react-native";
 import { 
    Color,
    Border
} from "../assets/general/GlobalStyles";
import { useState,useEffect } from "react";
import { Dropdown } from "react-native-element-dropdown";
import { generalStyles } from "../assets/general/generalStyles";
// schema of the data passed to as parameter to the Sorting DropDown
interface itemlistItemSchema {
    value: string,
    label: string
}
// interface for the function
interface dropDownProps {
    dataList: itemlistItemSchema[],
    title: string,
    callbackFunction: (newValue:string, index:number) => void,
    index: number
}
// a custom dropdown list component
// used as a filter
// parameters: datalist, title and callbackFunction
// datalist is the list of choices that will be displayed by the dropdownlist
// title is the text displays what type of choices the dropdown list offers
// callbackFunction is a reference to the function that will trigger when the value in the dropdownlist changes
export const SortingDropDown: React.FC<dropDownProps> = ({dataList, title, callbackFunction, index}) =>{
    // keeps track of the value of the dropdown locally
    const [value, setValue] = useState("");
    // state
    const [isFocus, setIsFocus] = useState(false);
    // renders a text above the dropdown list
    // text displayed when when the dropdown list is on focused or the there is a selected value for the dropdown list
    const renderLabel = () => {
        if (isFocus || value.length>0) {
          return (
            <Text style={[styles.label, isFocus && { color: Color.colorPaleovioletred }]}>
              {title}
            </Text>
          );
        }
        return null;
    };
    const generatePlaceHolder = () =>{
        if(!isFocus && value.length === 0){
            return title
        }else{
            return ""
        }
    }
    // calls the callback function
    // updates the local state of the component
    const handleOnChangeValue = (newValue: string) =>{
        setValue(newValue);
        callbackFunction(newValue,index);
    }
    return (
        <View style={[generalStyles.flexContainer, generalStyles.centerContainer, styles.dropDownMainContainerStyle]}>
            {renderLabel()}
            <Dropdown
                // styling
                style={[styles.dropDownContentContainerStyle, isFocus&& { borderColor: Color.colorPaleovioletred }]}
                placeholderStyle = {[styles.selectionDisplay]}
                iconStyle = {
                    [(isFocus?styles.rotatedIcon:styles.normalIcon)]
                }
                iconColor={dataList.length> 0? Color.colorPaleovioletred: "grey"}
                containerStyle ={[styles.filterItemListContainer]}
                itemContainerStyle ={[styles.selectedItem]}
                // custom dropdown configuration
                placeholder= {generatePlaceHolder()}
                selectedTextProps={{numberOfLines: 1}}
                mode="modal"
                onFocus={() =>{
                    setIsFocus(true);
                }}
                onBlur={() =>{
                    setIsFocus(false);
                }}
                data={dataList}
                value={value}
                labelField={"label"}
                valueField={"value"}
                searchField={"value"}
                onChange={item =>{
                    handleOnChangeValue(item.value);
                    setIsFocus(false);
                }}
                disable ={dataList.length< 0?true: false}
                activeColor={Color.colorPaleovioletred}
            />
        </View>
    )
}

// item in the filter list
// title: display on the drop down list as placeholder 
// item list of strings, value for the dropdown
export interface filterObject{
    title:string,
    item: Array<string>|string
}

// function signature
// callbackFunction triggers when one of the filters are selected
// filterList is the list of filters to create
interface multilFilterContainerProps{
    callbackFunction: (filterList: Array<filterObject>) => void,
    filterList: Array<filterObject>
}

// generates dropdown filters
// keeps the states of all the dropdown filters
// triggers the callback function upon changes in the dropdown filters
const MultiFilterContainer :React.FC<multilFilterContainerProps> = ({callbackFunction, filterList}) =>{
    // keeps track of list of filter titles and their selected values
    const [filters, setFilters] = useState<filterObject[]>([]);

    useEffect(() =>{
        createFilterStates()
    }, []);
    // populates the filters
    const createFilterStates = () =>{
        if(filterList.length > 0){
            const generatedFilters:filterObject[] = filterList.map(item =>{
                return {
                    title: item.title,
                    item: ""
                }
            });
            setFilters(generatedFilters);
        }
    }
    // sets the new value of the specified filter (index)
    // triggers the callback function
    const updateFilters = (newValue: string, index: number) =>{
        if(filters.length > 0){
            const filterCopy = filters;
            filterCopy[index].item = newValue
            setFilters(filterCopy);
            callbackFunction(filters);
        }
    }
    // creates instances of dropdown list based on the number of indices in filterlist
    const generateDropDowns = () =>{
        if(filterList.length > 0){
            const filterComponents = filterList.map((item, index)=>{
                var itemList: itemlistItemSchema[]
                if(Array.isArray(item.item)){
                    itemList = item.item.map(listItem =>{
                        return {
                            value: listItem,
                            label: listItem
                        }
                    })
                }else{
                    itemList = [{
                        value: item.item,
                        label: item.item
                    }]
                }

                return <SortingDropDown title={item.title} dataList={itemList} callbackFunction={updateFilters} index={index} key={index} />
            });
            return filterComponents;
        }
        return null
    }
    return(
        <View style = {[styles.filterContainer, generalStyles.rowContainer, styles.mainContainer]}>
            {generateDropDowns()}
        </View>
    )
}

export default MultiFilterContainer
const styles = StyleSheet.create({
    mainContainer:{
        marginBottom: 10,
    },
    // dropdown
    dropDownContentContainerStyle:{
        width: '95%',
        height: '95%',
        borderColor: 'gray',
        borderWidth: 2,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    selectionDisplay:{
        width: '95%',
        overflow: 'hidden'
    },
    dropDownMainContainerStyle:{
        zIndex: 1,
        height: 50
    },
    filterContainer:{
        marginTop:15,
        width: '100%',
    },
    label: {
        zIndex: 10,
        position: 'absolute',
        backgroundColor: Color.colorWhite,
        left: 10,
        top: -10,
        fontSize: 14,
    },
    normalIcon:{
        transform:[
            {
                rotate: '0deg'
            }
        ]
    },
    rotatedIcon:{
        transform:[
            {
                rotate: '180deg'
            }
        ]
    },
    filterItemListContainer:{
        width: 300,
        height: 'auto',
        borderRadius: Border.br_5xs,
        paddingVertical: 5
    },
    selectedItem:{
        width: '95%',
        height: 'auto',
        borderRadius: Border.br_5xs,
        alignSelf: 'center'
    }
})