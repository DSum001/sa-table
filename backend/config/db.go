package config

import (

    "fmt"
    //"time"
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

        &entity.Employee{}, 

        &entity.Member{},

        &entity.Gender{},

    )

    GenderMale := entity.Gender{Gender: "Male"}

    GenderFemale := entity.Gender{Gender: "Female"}


    db.FirstOrCreate(&GenderMale, &entity.Gender{Gender: "Male"})

    db.FirstOrCreate(&GenderFemale, &entity.Gender{Gender: "Female"})


    hashedPassword, _ := HashPassword("123456")

    employee := &entity.Employee{

    FirstName: "shubaba",

    LastName:  "booboo",

    Password: hashedPassword,

}

    db.FirstOrCreate(employee, &entity.Employee{

        Email: "shabuuu@gmail.com",

    })


}