import pandas as pd
from datetime import datetime, timedelta
import os

FILE_NAME = "expenses.xlsx"

# Ensure file exists
def initialize_file():
    if not os.path.exists(FILE_NAME):
        df = pd.DataFrame(columns=["Date", "Category", "Description", "Amount"])
        df.to_excel(FILE_NAME, index=False)

def add_expense():
    date = datetime.now().strftime("%Y-%m-%d")
    category = input("Enter category (Food, Travel, Shopping, Bills, Other): ")
    description = input("Enter description: ")
    amount = float(input("Enter amount: "))

    df = pd.read_excel(FILE_NAME)
    df.loc[len(df)] = [date, category, description, amount]
    df.to_excel(FILE_NAME, index=False)

    print("✅ Expense added successfully!")

def view_expenses(period):
    df = pd.read_excel(FILE_NAME)
    df["Date"] = pd.to_datetime(df["Date"])

    today = datetime.now()

    if period == "today":
        data = df[df["Date"].dt.date == today.date()]

    elif period == "weekly":
        week_ago = today - timedelta(days=7)
        data = df[df["Date"] >= week_ago]

    elif period == "monthly":
        month_ago = today - timedelta(days=30)
        data = df[df["Date"] >= month_ago]

    else:
        print("❌ Invalid period")
        return

    if data.empty:
        print("No expenses found for this period.")
    else:
        print("\n--- EXPENSE REPORT ---")
        print(data)
        print("\nTotal Spent:", data["Amount"].sum())

def menu():
    initialize_file()

    while True:
        print("\n===== EXPENSE TRACKER =====")
        print("1. Add Expense")
        print("2. View Today’s Expenses")
        print("3. View Weekly Report")
        print("4. View Monthly Report")
        print("5. Exit")

        choice = input("Choose an option: ")

        if choice == "1":
            add_expense()
        elif choice == "2":
            view_expenses("today")
        elif choice == "3":
            view_expenses("weekly")
        elif choice == "4":
            view_expenses("monthly")
        elif choice == "5":
            print("Goodbye!")
            break
        else:
            print("Invalid choice, try again.")

menu()
