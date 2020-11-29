import React from "react";
import { ArrowDropDown as ArrowDownIcon,
         ArrowDropUp as ArrowUpdIcon }
from '@material-ui/icons'

export const renderArrowDirection = function (props,field){
    if(!checkOrderBy(props,field)){
        return '';
    }
    return(getLabelDirectionIcon(props));
} 

export const toggleOrderBy = function(props,field){
    props.setOrderBy(props,field);
    props.getList(props,props.currentPage);
}

export const search = function(props,e){
    e.preventDefault();
    props.getList(props,0);
}

function checkOrderBy(props,field){
    return (props.paginationParams.orderBy 
            && props.paginationParams.orderBy === field);
}

function getLabelDirectionIcon(props){
    return (props.paginationParams.direction 
        && props.paginationParams.direction === "ASC" ? <ArrowUpdIcon /> : <ArrowDownIcon />);
}