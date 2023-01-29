type Serializer<T extends { [key: string]: unknown }> = {
  [key in keyof T]: T[key] extends Date ? string : T[key]
}

type ArrayElement<A> = A extends readonly (infer T)[] ? T : never

type SerializerArray<
  A extends Array<{ [key: string]: unknown }>,
  T = ArrayElement<A>
> = {
  [key in keyof T]: T[key] extends Date ? string : T[key]
}[]

type SerializerNestedArray<T extends { [key: string]: unknown }> = {
  [key in keyof T]: T[key] extends { [key: string]: unknown }[]
    ? SerializerArray<T[key]>
    : T[key]
}
