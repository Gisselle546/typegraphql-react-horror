import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  orders: Array<Order>;
  reviews: Array<Review>;
  reviewByID?: Maybe<Review>;
  getReviewByUser: Array<Review>;
  getReviewByTour: Array<Review>;
  tours: Array<Tour>;
  tourByID?: Maybe<Tour>;
  users: Array<User>;
  userByID?: Maybe<User>;
  me?: Maybe<User>;
};


export type QueryReviewByIdArgs = {
  reviewId: Scalars['Float'];
};


export type QueryGetReviewByUserArgs = {
  data: GetUser;
};


export type QueryGetReviewByTourArgs = {
  tourId: Scalars['Float'];
};


export type QueryToursArgs = {
  data: Scalars['String'];
};


export type QueryTourByIdArgs = {
  tourId: Scalars['Float'];
};


export type QueryUserByIdArgs = {
  userId: Scalars['Float'];
};

export type Order = {
  __typename?: 'Order';
  id: Scalars['Int'];
  quantity: Scalars['Float'];
  reservation: Scalars['String'];
  total: Scalars['Float'];
  userId: User;
};

export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  name: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  avatar: Scalars['String'];
  reviews: Array<Review>;
  orders: Array<Order>;
};

export type Review = {
  __typename?: 'Review';
  id: Scalars['Int'];
  description: Scalars['String'];
  rating: Scalars['Float'];
  userId: Scalars['Float'];
  user: User;
  tourId: Tour;
};

export type Tour = {
  __typename?: 'Tour';
  id: Scalars['Int'];
  name: Scalars['String'];
  image: Array<Scalars['String']>;
  description: Scalars['String'];
  location: Scalars['String'];
  price: Scalars['Float'];
  reviews: Array<Review>;
};

export type GetUser = {
  id: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createOrder: Order;
  createReview: Review;
  createTours: Tour;
  register: GetToken;
  login: GetToken;
};


export type MutationCreateOrderArgs = {
  data: OrderInput;
};


export type MutationCreateReviewArgs = {
  data: ReviewInput;
};


export type MutationCreateToursArgs = {
  data: CreateInput;
};


export type MutationRegisterArgs = {
  data: RegisterInput;
};


export type MutationLoginArgs = {
  data: LoginInput;
};

export type OrderInput = {
  quantity: Scalars['Float'];
  reservation: Scalars['String'];
  total: Scalars['Float'];
  stripeId: Scalars['String'];
};

export type ReviewInput = {
  rating: Scalars['Float'];
  description: Scalars['String'];
  tourid: Scalars['Int'];
};

export type CreateInput = {
  name: Scalars['String'];
  images: Scalars['String'];
  location: Scalars['String'];
  description: Scalars['String'];
  price: Scalars['Float'];
};

export type GetToken = {
  __typename?: 'getToken';
  accessToken: Scalars['String'];
  user: User;
};

export type RegisterInput = {
  name: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type CreateOrderMutationVariables = Exact<{
  quantity: Scalars['Float'];
  reservation: Scalars['String'];
  stripeId: Scalars['String'];
  total: Scalars['Float'];
}>;


export type CreateOrderMutation = (
  { __typename?: 'Mutation' }
  & { createOrder: (
    { __typename?: 'Order' }
    & Pick<Order, 'id'>
  ) }
);

export type CreateReviewMutationVariables = Exact<{
  rating: Scalars['Float'];
  description: Scalars['String'];
  tourid: Scalars['Int'];
}>;


export type CreateReviewMutation = (
  { __typename?: 'Mutation' }
  & { createReview: (
    { __typename?: 'Review' }
    & Pick<Review, 'id' | 'rating' | 'description'>
  ) }
);

export type ToursQueryVariables = Exact<{
  data: Scalars['String'];
}>;


export type ToursQuery = (
  { __typename?: 'Query' }
  & { tours: Array<(
    { __typename?: 'Tour' }
    & Pick<Tour, 'id' | 'name' | 'image' | 'location' | 'description' | 'price'>
    & { reviews: Array<(
      { __typename?: 'Review' }
      & Pick<Review, 'rating'>
    )> }
  )> }
);

export type TourByIdQueryVariables = Exact<{
  tourId: Scalars['Float'];
}>;


export type TourByIdQuery = (
  { __typename?: 'Query' }
  & { tourByID?: Maybe<(
    { __typename?: 'Tour' }
    & Pick<Tour, 'id' | 'name' | 'description' | 'image' | 'location' | 'price'>
    & { reviews: Array<(
      { __typename?: 'Review' }
      & Pick<Review, 'rating' | 'description'>
      & { user: (
        { __typename?: 'User' }
        & Pick<User, 'name'>
      ) }
    )> }
  )> }
);

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'getToken' }
    & Pick<GetToken, 'accessToken'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'name'>
    ) }
  ) }
);

export type RegisterMutationVariables = Exact<{
  name: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'getToken' }
    & Pick<GetToken, 'accessToken'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'name'>
    ) }
  ) }
);


export const CreateOrderDocument = gql`
    mutation createOrder($quantity: Float!, $reservation: String!, $stripeId: String!, $total: Float!) {
  createOrder(
    data: {quantity: $quantity, reservation: $reservation, stripeId: $stripeId, total: $total}
  ) {
    id
  }
}
    `;
export type CreateOrderMutationFn = Apollo.MutationFunction<CreateOrderMutation, CreateOrderMutationVariables>;

/**
 * __useCreateOrderMutation__
 *
 * To run a mutation, you first call `useCreateOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOrderMutation, { data, loading, error }] = useCreateOrderMutation({
 *   variables: {
 *      quantity: // value for 'quantity'
 *      reservation: // value for 'reservation'
 *      stripeId: // value for 'stripeId'
 *      total: // value for 'total'
 *   },
 * });
 */
export function useCreateOrderMutation(baseOptions?: Apollo.MutationHookOptions<CreateOrderMutation, CreateOrderMutationVariables>) {
        return Apollo.useMutation<CreateOrderMutation, CreateOrderMutationVariables>(CreateOrderDocument, baseOptions);
      }
export type CreateOrderMutationHookResult = ReturnType<typeof useCreateOrderMutation>;
export type CreateOrderMutationResult = Apollo.MutationResult<CreateOrderMutation>;
export type CreateOrderMutationOptions = Apollo.BaseMutationOptions<CreateOrderMutation, CreateOrderMutationVariables>;
export const CreateReviewDocument = gql`
    mutation createReview($rating: Float!, $description: String!, $tourid: Int!) {
  createReview(
    data: {rating: $rating, description: $description, tourid: $tourid}
  ) {
    id
    rating
    description
  }
}
    `;
export type CreateReviewMutationFn = Apollo.MutationFunction<CreateReviewMutation, CreateReviewMutationVariables>;

/**
 * __useCreateReviewMutation__
 *
 * To run a mutation, you first call `useCreateReviewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateReviewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createReviewMutation, { data, loading, error }] = useCreateReviewMutation({
 *   variables: {
 *      rating: // value for 'rating'
 *      description: // value for 'description'
 *      tourid: // value for 'tourid'
 *   },
 * });
 */
export function useCreateReviewMutation(baseOptions?: Apollo.MutationHookOptions<CreateReviewMutation, CreateReviewMutationVariables>) {
        return Apollo.useMutation<CreateReviewMutation, CreateReviewMutationVariables>(CreateReviewDocument, baseOptions);
      }
export type CreateReviewMutationHookResult = ReturnType<typeof useCreateReviewMutation>;
export type CreateReviewMutationResult = Apollo.MutationResult<CreateReviewMutation>;
export type CreateReviewMutationOptions = Apollo.BaseMutationOptions<CreateReviewMutation, CreateReviewMutationVariables>;
export const ToursDocument = gql`
    query tours($data: String!) {
  tours(data: $data) {
    id
    name
    image
    location
    description
    price
    reviews {
      rating
    }
  }
}
    `;

/**
 * __useToursQuery__
 *
 * To run a query within a React component, call `useToursQuery` and pass it any options that fit your needs.
 * When your component renders, `useToursQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useToursQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useToursQuery(baseOptions?: Apollo.QueryHookOptions<ToursQuery, ToursQueryVariables>) {
        return Apollo.useQuery<ToursQuery, ToursQueryVariables>(ToursDocument, baseOptions);
      }
export function useToursLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ToursQuery, ToursQueryVariables>) {
          return Apollo.useLazyQuery<ToursQuery, ToursQueryVariables>(ToursDocument, baseOptions);
        }
export type ToursQueryHookResult = ReturnType<typeof useToursQuery>;
export type ToursLazyQueryHookResult = ReturnType<typeof useToursLazyQuery>;
export type ToursQueryResult = Apollo.QueryResult<ToursQuery, ToursQueryVariables>;
export const TourByIdDocument = gql`
    query tourByID($tourId: Float!) {
  tourByID(tourId: $tourId) {
    id
    name
    description
    image
    location
    price
    reviews {
      rating
      description
      user {
        name
      }
    }
  }
}
    `;

/**
 * __useTourByIdQuery__
 *
 * To run a query within a React component, call `useTourByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useTourByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTourByIdQuery({
 *   variables: {
 *      tourId: // value for 'tourId'
 *   },
 * });
 */
export function useTourByIdQuery(baseOptions?: Apollo.QueryHookOptions<TourByIdQuery, TourByIdQueryVariables>) {
        return Apollo.useQuery<TourByIdQuery, TourByIdQueryVariables>(TourByIdDocument, baseOptions);
      }
export function useTourByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TourByIdQuery, TourByIdQueryVariables>) {
          return Apollo.useLazyQuery<TourByIdQuery, TourByIdQueryVariables>(TourByIdDocument, baseOptions);
        }
export type TourByIdQueryHookResult = ReturnType<typeof useTourByIdQuery>;
export type TourByIdLazyQueryHookResult = ReturnType<typeof useTourByIdLazyQuery>;
export type TourByIdQueryResult = Apollo.QueryResult<TourByIdQuery, TourByIdQueryVariables>;
export const LoginDocument = gql`
    mutation login($email: String!, $password: String!) {
  login(data: {email: $email, password: $password}) {
    accessToken
    user {
      id
      name
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const RegisterDocument = gql`
    mutation register($name: String!, $email: String!, $password: String!) {
  register(data: {name: $name, email: $email, password: $password}) {
    accessToken
    user {
      id
      name
    }
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      name: // value for 'name'
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, baseOptions);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;