# What is Record<string, string> ?
in our code we use errors: Record<string, string>;

think of record as a way to define an object with key and values of specific types

for example: 
const errors: Record<string, string>  = {
  name: "Name is required",
  email: "email is required",
  education: "Education is required",
};

anotehr example:
const person: Record<string, string> = {
  name: "yash",
  city: "delhi",
  job: "Developer",
}

# whats is Zod  ?
Zod is a typeScript  first validation library, we use it to chck whether some data is in format and condition that we expect.

# what is schema ?
a schema is a set of rules describing what valid data should look like.



