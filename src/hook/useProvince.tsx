import {
 ICity,
 IDistrict,
 IWard,
} from "constants/models/province.mode";
import React, { useEffect, useState } from "react";
import {
 getCity,
 getDistrict,
 getWard,
} from "services/province.service";

export default function useProvince() {
 const [city, setCity] = useState<ICity[]>([]);
 const [district, setDistrict] = useState<IDistrict[]>([]);
 const [ward, setWard] = useState<IWard[]>([]);

 const fetchCity = async () => {
  try {
   const res: any = await getCity();
   setCity(res.data.data);
  } catch (error) {}
 };

 const onChangeCity = async (id: string) => {
  try {
   const res: any = await getDistrict(id);
   setDistrict(res.data.data);
  } catch (error) {}
 };

 const onChangeDistrict = async (id: string) => {
  try {
   const res: any = await getWard(id);

   setWard(res.data.data);
  } catch (error) {}
 };

 return {
  city,
  onChangeCity,
  district,
  onChangeDistrict,
  ward,
  fetchCity,
 };
}
