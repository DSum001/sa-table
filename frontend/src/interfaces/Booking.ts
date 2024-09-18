// interfaces/Booking.ts
import { SoupInterface } from './Soup'; // ปรับเส้นทางให้ตรงกับที่อยู่จริงของไฟล์ Soup.ts

export interface BookingInterface {
    ID?: number; 
    number_of_customer?: number; 
    package_id?: number; 
    table_id?: number; 
    member_id?: number; 
    employee_id?: number;
    soups?: SoupInterface[];
}
