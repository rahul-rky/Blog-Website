#include<bits/stdc++.h>
using namespace std;

class Search {
    public:
        virtual vector<Book> searchByTitle(string title) = 0;
        virtual vector<Book> searchByAuthor(string author) = 0;
        virtual vector<Book> searchBySubject(string subject) = 0;
};

class SearchCatalog : public Search {
    private:
        _Date creationDate;
        static int totalBooks;
        map<string, vector<Book>> bookTitles;
        map<string, vector<Book>> bookAuthors;
        map<string, vector<Book>> bookSubjects;
    
    public:
        vector<Book> searchByTitle(string query){

        }
        vector<Book> searchByAuthor(string query){

        }
        vector<Book> searchBySubject(string query){

        }
};

class Update{
public:
    virtual bool Add_Book() = 0{

    }
    virtual bool Remove_Book() = 0{

    }
    virtual bool Edit_Book() = 0{

    }
};

class UpdateCatalog : public Update{


}

struct Address {

    string streetAddress;
    string city;
    string state;
    string zipcode;
    string country;
};

struct Person {
    string name;
    Address address;
    string email;
    string phone;
};

enum BookFormat {
    Paperback,
    NewsPaper,
    Magazine,
    Ebook
};

enum BookStatus {
    Available,
    Reserved,
    Lost
};

enum ReservationStatus {
    Waiting,
    Pending,
    Canceled,
    None
};

enum AccountStatus {
    Active,
    Closed,
    Canceled,
    Blacklisted,
    None
};

const int MAX_BOOK_ISSUED_TO_USER = 5;
const int MAX_LENDING_DAYS = 10;

class Account {
    private:
        string Id;
        string password;
        AccountStatus status;
        Person person;

    protected:
        bool resetPassword(){

        }
};

class Librarian : public Account {
    public:
        bool addBookItem(){

        }
        bool blockMember(){

        }
        bool unblockMember(){

        }
};

class Member : public Account {
    private:
        _Date dateOfMembership;
        int totalBookIssued;
    
    public:
        int getTotalBookIssued(){

        }
};

class Book{
public:
    string ISBN;
    string title;
    Author author;
    string subject;
    string publisher;
    string language;
    int numberOfPages;

    string getTitle(){

    }
};

class BookItem : public Book{
protected:
    string barcode;
    bool isReferenceOnly;
    _Date borrowed;
    _Date dueDate;
    double price;
    BookFormat format;
    BookStatus status;

public:
    bool checkOut(){

    }
};

int main(){

    return 0;
}

