# node-red-contrib-apilayer
Provide nodes to call apilayer API.

## apilayer-config node
Add your api key for apilayer

## apilayer-execute node
Execute api calls. In msg.payload, provide two props:
- resource
- args


## Example
Input format should be:
```json
{
    payload: {
        resource: "person.enrich",
        args: {
            email: "someone@example.com"
        }
    }
}
```

Output msg.payload contains the result of your query.