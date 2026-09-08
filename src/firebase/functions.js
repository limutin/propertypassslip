import { collection, addDoc, getDocs, doc, updateDoc, query, orderBy, Timestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from './config';

// Generate unique pass slip number
export const generatePassSlipNumber = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `PPS-${year}${month}${day}-${random}`;
};

// Create a new pass slip
export const createPassSlip = async (passSlipData) => {
  try {
    const passSlipNo = generatePassSlipNumber();
    const docRef = await addDoc(collection(db, 'passSlips'), {
      ...passSlipData,
      passSlipNo,
      createdAt: Timestamp.now(),
      status: 'borrowed'
    });
    return { id: docRef.id, passSlipNo };
  } catch (error) {
    console.error('Error creating pass slip:', error);
    throw error;
  }
};

// Get all pass slips
export const getAllPassSlips = async () => {
  try {
    const q = query(collection(db, 'passSlips'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const passSlips = [];
    querySnapshot.forEach((doc) => {
      passSlips.push({ id: doc.id, ...doc.data() });
    });
    return passSlips;
  } catch (error) {
    console.error('Error getting pass slips:', error);
    throw error;
  }
};

// Update pass slip return status
export const updateReturnStatus = async (passSlipId, returnData) => {
  try {
    const passSlipRef = doc(db, 'passSlips', passSlipId);
    await updateDoc(passSlipRef, {
      returnStatus: returnData,
      status: 'returned'
    });
  } catch (error) {
    console.error('Error updating return status:', error);
    throw error;
  }
};

// Upload PDF to Firebase Storage
export const uploadPDF = async (pdfBlob, passSlipNo) => {
  try {
    const storageRef = ref(storage, `pass-slips/${passSlipNo}.pdf`);
    await uploadBytes(storageRef, pdfBlob);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    console.error('Error uploading PDF:', error);
    throw error;
  }
};

// Update pass slip with PDF URL
export const updatePassSlipPDF = async (passSlipId, pdfUrl) => {
  try {
    const passSlipRef = doc(db, 'passSlips', passSlipId);
    await updateDoc(passSlipRef, { pdfUrl });
  } catch (error) {
    console.error('Error updating PDF URL:', error);
    throw error;
  }
};
