package com.redit.db;

import com.j256.ormlite.field.DatabaseField;
import com.j256.ormlite.table.DatabaseTable;

/**
 * Created By : Lalit The Coder of house Umbarkar, First of his name, Khalasar of UAC, King in the West.
 * Created On : 21 Apr 2019
 * Organisation: CustomerXPs Software Private Ltd.
 */
@DatabaseTable(tableName = "expense")
public class Expense {

    @DatabaseField(generatedId = true)
    public int id;

    @DatabaseField(columnName = "name", canBeNull = false)
    public String title;

    @DatabaseField(columnName = "is_approved", canBeNull = false)
    public Boolean isApproved;

    @DatabaseField(foreign = true, columnName = "manager")
    public Employee manager;

}
