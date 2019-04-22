# node-red-contrib-apilayer
Provide nodes to call apilayer API to check emails.

## apilayer-config node
Add your api key for apilayer

## apilayer-execute node
Execute api calls. In msg.payload, provide the email to check


## Example
Input format should be:
```json
{
    payload: "someone@example.com"
}
```

Output msg.payload contains the result of your query.