"use client";

import React, { useState } from "react";

export default function AddProduct() {
  const [state, setState] = useState<any>({});

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setState((prevState: any) => ({ ...prevState, [name]: value }));
  };

  const submitData = async (e: any) => {
    e.preventDefault();

    const data = {
      name: state.name,
      price: state.price,
      type: state.type,
      category: state.category,
      discount: {
        minQty: state.discountQty,
        value: state.discountVal,
        type: state.discountType,
      },
    };

    const url = "http://localhost:4000/api/product";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(data),
    });

    const resData = await response.json();
  };

  return (
    <>
      <div className=" p-8">
        <div className="w-3/4 bg-sky-100 p-8 rounded-xl">
          <h1 className="text-2xl font-semibold">Add Product</h1>
          <form>
            <div>
              <label className="px-2">Name</label>
              <input
                type="string"
                name="name"
                className="bg-gray-50 border p-2 rounded-lg"
                placeholder="Product Name"
                onChange={handleChange}
              />
            </div>
            <div className="py-5">
              <label className="px-2">Price</label>
              <input
                type="number"
                name="price"
                className="bg-gray-50 border p-2 rounded-lg"
                placeholder="Product Price"
                onChange={handleChange}
              />
            </div>
            <div className="py-5">
              <label className="px-2">Type</label>
              <select
                className="bg-gray-50 border p-2 rounded-lg"
                onChange={handleChange}
                name="type"
              >
                <option>regular</option>
                <option>normal</option>
                <option>special</option>
              </select>
            </div>
            <div>
              <label className="px-2">Category</label>
              <input
                type="string"
                name="category"
                className="bg-gray-50 border p-2 rounded-lg"
                placeholder="Product Category"
                onChange={handleChange}
              />
            </div>
            <div className="py-5">
              <label className="px-2">Discount</label>
              <input
                type="number"
                name="discountQty"
                className="bg-gray-50 border p-2 rounded-lg"
                placeholder="Product quantity"
                onChange={handleChange}
              />
              <input
                type="number"
                name="price"
                className="bg-gray-50 border p-2 rounded-lg"
                placeholder="discountVal"
                onChange={handleChange}
              />
              <select
                className="bg-gray-50 border p-2 rounded-lg"
                onChange={handleChange}
                name="discountType"
              >
                <option>fixed</option>
                <option>percentage</option>
              </select>
              <button
                className="bg-blue-500 p-2 w-32 my-5 rounded-lg"
                type="button"
                onClick={submitData}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
