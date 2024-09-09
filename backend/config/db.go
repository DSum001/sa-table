package config

import (

    "fmt"
    "github.com/DSum001/sa-table/entity"
    "gorm.io/driver/sqlite"
    "gorm.io/gorm"

)

var db *gorm.DB

func DB() *gorm.DB {
    return db
}

func ConnectionDB() {

    database, err := gorm.Open(sqlite.Open("sa.db?cache=shared"), &gorm.Config{})
    if err != nil {
        panic("failed to connect database")
    }

    fmt.Println("connected database")
    db = database

}

func SetupDatabase() {

    db.AutoMigrate(
        
        &entity.Booking{},
        &entity.Table{},
        &entity.TableStatus{},
        &entity.Soup{},
        &entity.BookingSoup{},
        &entity.Package{},
        &entity.Employee{},
        &entity.Member{},
        
    )

    Booking1 := &entity.Booking {
        NumberOfCustomer: 12,

    }
    db.FirstOrCreate(Booking1, &entity.Booking{NumberOfCustomer: 12})

    TableFourSeat1 := entity.Table{TableType: "F1", TableStatusID: 1}
    TableFourSeat2 := entity.Table{TableType: "F2", TableStatusID: 1}
    TableFourSeat3 := entity.Table{TableType: "F3", TableStatusID: 1}
    TableFourSeat4 := entity.Table{TableType: "F4", TableStatusID: 1}
    TableFourSeat5 := entity.Table{TableType: "F5", TableStatusID: 1}
    TableFourSeat6 := entity.Table{TableType: "F6", TableStatusID: 1}
    TableSixSeat1 := entity.Table{TableType: "S1", TableStatusID: 1}
    TableSixSeat2 := entity.Table{TableType: "S2", TableStatusID: 1}
    TableSixSeat3 := entity.Table{TableType: "S3", TableStatusID: 1}
    TableSixSeat4 := entity.Table{TableType: "S4", TableStatusID: 1}
    TableEightSeat1 := entity.Table{TableType: "E1", TableStatusID: 1}
    TableEightSeat2 := entity.Table{TableType: "E2", TableStatusID: 1}

    StatusAvailable := entity.TableStatus{Status: "Available"}
    StatusNotAvailable := entity.TableStatus{Status: "Not Available"}
    StatusReserved := entity.TableStatus{Status: "Reserved"}

    Soup1 := entity.Soup{Name: "น้ำใส"}
    Soup2 := entity.Soup{Name: "น้ำดำ"}
    Soup3 := entity.Soup{Name: "ซุปหม่าล่า", Price: 12}
    Soup4 := entity.Soup{Name: "ซุปทงคัตสึ", Price: 12}
    
    Package_pork_chicken := entity.Package{Name: "หมู,ไก่", Price: 179, Point: 50}
    Package_seafood := entity.Package{Name: "ทะเล", Price: 249, Point: 100}
    Package_beef := entity.Package{Name: "เนื้อ", Price: 279, Point: 150}

    db.FirstOrCreate(&TableFourSeat1, &entity.Table{TableType: "F1", TableStatusID: 1})
    db.FirstOrCreate(&TableFourSeat2, &entity.Table{TableType: "F2", TableStatusID: 1})
    db.FirstOrCreate(&TableFourSeat3, &entity.Table{TableType: "F3", TableStatusID: 1})
    db.FirstOrCreate(&TableFourSeat4, &entity.Table{TableType: "F4", TableStatusID: 1})
    db.FirstOrCreate(&TableFourSeat5, &entity.Table{TableType: "F5", TableStatusID: 1})
    db.FirstOrCreate(&TableFourSeat6, &entity.Table{TableType: "F6", TableStatusID: 1})
    db.FirstOrCreate(&TableSixSeat1, &entity.Table{TableType: "S1", TableStatusID: 1})
    db.FirstOrCreate(&TableSixSeat2, &entity.Table{TableType: "S2", TableStatusID: 1})
    db.FirstOrCreate(&TableSixSeat3, &entity.Table{TableType: "S3", TableStatusID: 1})
    db.FirstOrCreate(&TableSixSeat4, &entity.Table{TableType: "S4", TableStatusID: 1})
    db.FirstOrCreate(&TableEightSeat1, &entity.Table{TableType: "E1", TableStatusID: 1})
    db.FirstOrCreate(&TableEightSeat2, &entity.Table{TableType: "E2", TableStatusID: 1})


    db.FirstOrCreate(&StatusAvailable, &entity.TableStatus{Status: "Available"})
    db.FirstOrCreate(&StatusNotAvailable, &entity.TableStatus{Status: "Not Available"})
    db.FirstOrCreate(&StatusReserved, &entity.TableStatus{Status: "Reserved"})

    db.FirstOrCreate(&Soup1, &entity.Soup{Name: "น้ำใส"})
    db.FirstOrCreate(&Soup2, &entity.Soup{Name: "น้ำดำ"})
    db.FirstOrCreate(&Soup3, &entity.Soup{Name: "ซุปหม่าล่า", Price: 12})
    db.FirstOrCreate(&Soup4, &entity.Soup{Name: "ซุปทงคัตสึ", Price: 12})

    db.FirstOrCreate(&Package_pork_chicken, &entity.Package{Name: "หมู,ไก่", Price: 179, Point: 50})
    db.FirstOrCreate(&Package_seafood, &entity.Package{Name: "ทะเล", Price: 249, Point: 100})
    db.FirstOrCreate(&Package_beef, &entity.Package{Name: "เนื้อ", Price: 279, Point: 150})

    hashedPassword, _ := HashPassword("123456")
    employee := &entity.Employee {

        FirstName: "shubaba",
        LastName:  "booboo",
        Email: "shabu@gmail.com",
        Gender_id: 1,
        Position_id: 1,
        Password: hashedPassword,

    }

    db.FirstOrCreate(employee, &entity.Employee{Email: "shabu@gmail.com",})

}