import React from 'react';
import {Card, CardBody, CardFooter, Image} from "@nextui-org/react";
import useCategory from '../Hooks/useCategory';
import { Link } from 'react-router-dom';
import Header from './Header';




const CategoryCard = () => {

    const {categories} = useCategory()

    return (
        <>
        <Header title={'Category'} description={'Find medicine from a specific category'}></Header>
        <section className='px-[100px] pb-20'>
        <div className="gap-10 grid grid-cols-2 sm:grid-cols-3">
      {categories.map((item, index) => (
        <Card shadow="lg" key={index} isPressable>
          <CardBody className="overflow-visible p-0">
                <Link to={`/categoryDetails/${item.categoryName}`} >
            <Image
              shadow="sm"
              radius="lg"
              width="100%"
              alt={item.categoryName}
              className="w-full object-cover h-[140px]"
              src={item.image}
            />
        </Link>
          </CardBody>
          <CardFooter className="text-small justify-between">
            <b>{item.categoryName}</b>
            <p className="text-default-500 font-bold">{item.totalIncategory}</p>
          </CardFooter>
        </Card>
      ))}
    </div>
        </section>
            
        </>
    );
};

export default CategoryCard;