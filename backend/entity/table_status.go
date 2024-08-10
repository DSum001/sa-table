package entity

import (

	"gorm.io/gorm"

)

type TableStatus struct {

	gorm.Model
    TableStatusID 	uint 			`json:"table_status_id"`
    Status 			string 			`json:"status"`

}