"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Products() {
  const [state, setState] = useState<any>([]);
  const [filter, setFilter] = useState<any>({
    type: "",
    category: "",
  });
  const [cartQty, setCartQty] = useState(1);

  useEffect(() => {
    getData({ type: filter.type, category: filter.category });
  }, [filter]);

  const getData = async ({ type, category }: any) => {
    let query;

    if (type) {
      query = `?type=${type}`;
    }
    if (category) {
      query = `?category=${category}`;
    }
    if (type && category) {
      query = `?type=${type}&category=${category}`;
    }

    let url = "http://localhost:4000/api/get-cart";

    if (query) url += query;

    const response = await fetch(url);

    const resData = await response.json();

    setState(resData.data);
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFilter((prevState: any) => ({ ...prevState, [name]: value }));
    console.log(filter);
  };

  const addToCart = async ({ productId }: any) => {
    const data = {
      productId,
      qty: cartQty,
      userId: "6654390f6ecd6ee0009fc6df", // todo
    };

    const url = "http://localhost:4000/api/get-cart";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(data),
    });

    const resData = await response.json();

    console.log(resData);
  };
  return (
    <div>
      <div className="p-5 flex justify-between ">
        <h1 className="text-xl font-semibold">Cart</h1>
      </div>
      <div className="grid grid-cols-5 gap-5">
        {state.map((item: any, key: number) => (
          <div key={key} className="p-5 rounded-xl bg-sky-100">
            <h1 className="text-lg font-semibold">{item?.productId?.name}</h1>
            <div className="flex gap-2">
              <h4 className="font-semibold"> ₹ {item?.productId?.price}</h4>
              <h6>{item?.productId?.category}</h6>
              <h6>{item?.productId?.type}</h6>
            </div>
          </div>
        ))}
      </div>
      <div>
        <div className="flex gap-2 p-1">
          Coupon
          <input type="text" className="by-sky-100 border h-10 w-32" />
          <Link href="/checkout" className="bg-blue-300 p-2 rounded">
            Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}
