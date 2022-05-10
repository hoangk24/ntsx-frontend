import { Menu } from "antd";
import SubMenu from "antd/lib/menu/SubMenu";
import { RootState } from "app/store";
import {
 ICategory,
 ISubCategory,
} from "constants/models/category.model";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export default function MenuUser() {
 const categories = useSelector(
  (state: RootState) => state.category.categories
 );
 const navigate = useNavigate();

 const mapMenu = useMemo(() => {
  if (categories)
   return categories.map((it: ICategory) => (
    <SubMenu key={Math.random()} title={it.name}>
     {it.subCategory.map((it: ISubCategory, idx: number) => (
      <Menu.Item key={Math.random() + idx}>
       <Link to={`/product/nsx/${it.path}`}>{it.name}</Link>
      </Menu.Item>
     ))}
    </SubMenu>
   ));
  else return null;
 }, [categories]);
 return (
  <Menu theme="dark" mode="inline">
   {mapMenu}
  </Menu>
 );
}
