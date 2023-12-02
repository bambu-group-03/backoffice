export interface MyStats {
  category: string;
  stat: string;
  data: { name: string; value: number }[];
};

export interface DataPerMonth {
  name: string;
  description: string; 
  color : string;
  data: { Month: string; value: number}[];
};