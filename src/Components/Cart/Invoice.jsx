import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { axiosSecure } from "../../Hooks/useAxiosSecure";
import { Page, Text, View, Image, Document, StyleSheet, PDFDownloadLink } from "@react-pdf/renderer";
import { AiFillMedicineBox } from "react-icons/ai";
import {format} from 'date-fns'
import useAuth from "../../Hooks/useAuth";
import { Button } from "@nextui-org/react";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  title: {
    color: "#10B981",
    fontSize: "32px"
  },
  img: {
    width: 100,
    height: 130,
    borderRadius: '4%',
    marginTop: "20px"
  },
});

const InvoiceDocument = ({ purchaseInfo, totalAmount, data, user }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Purchase Date: {format(new Date(data.date), "dd/MM/yyyy")}</Text>
        <Text>Name: {user?.displayName}</Text>
        <Text>Email: {data.buyerEmail}</Text>
        <Text>Total Amount: ${totalAmount}</Text>
        <Text>Products Name:</Text>
        {purchaseInfo.map((item, index) => (
          <Text key={index}>{item.name},</Text>
        ))}
      </View>
      <View style={styles.section}>
        <Text style={styles.title}>MediMarketHub</Text>
        <Image style={styles.img} src={user?.photoURL} />
      </View>
    </Page>
  </Document>
);

const Invoice = () => {
  const params = useParams();
  const {user} = useAuth()

  console.log("invoice", params.transactionId);

  const { data = {}, isLoading } = useQuery({
    queryKey: ["invoice", params.transactionId],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/purchase/${params.transactionId}`);
      console.log(data);
      return data;
    },
  });

  const { purchaseInfo = [], totalAmount } = data;

  if (isLoading) return "loading";

  return (
    <>
    <h1 className="text-4xl font-bold text-center mt-14 font-serif">Invoice</h1>
    <section className="flex justify-evenly mt-10">
        <div>
        <Link className="btn btn-ghost hover:bg-white font-bold text-2xl "><AiFillMedicineBox className='text-emerald-500 text-2xl ' />
        MediMarketHub</Link>
        </div>
        <div>
        <PDFDownloadLink
        className="btn bg-gradient-to-br to-teal-400 from-emerald-600 font-bold text-white animate-bounce"
        document={<InvoiceDocument purchaseInfo={purchaseInfo} totalAmount={totalAmount}  data={data} user={user} />}
        fileName="invoice.pdf"
      >
        {({ blob, url, loading, error }) =>
          loading ? "Loading document..." : "Download Invoice"
        }
      </PDFDownloadLink>
        </div>
    </section>
    <section className="flex justify-evenly mt-6">
        <div className="text-xl font-bold ml-10">
            <p>Total Paid: ${totalAmount}</p>
            <p>Total Products: {purchaseInfo.length}</p>
            <ol>Products Name: {purchaseInfo.map((item, index) => (
          <li className="text-lg font-medium" key={index}>{item.name},</li>
        ))}</ol>
        <p>Purchase Date: {format(new Date(data.date), "dd/MM/yyyy")}</p>
        </div>
        <div className="text-xl font-bold border border-black text-black max-w-sm px-7 btn disabled  rounded-xl pointer-events-none ">
            Paid
        </div>
    </section>
    <section className="flex justify-center items-center my-20">
       <Link to={"/"}> <Button className="font-bold text-white bg-gradient-to-br to-teal-400 from-emerald-600">Go Back Home</Button></Link>
    </section>
      
    </>
  );
};

export default Invoice;
