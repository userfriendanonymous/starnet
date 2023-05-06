pub trait FromVec<T> where Self: Sized {
    fn from_vec(data: Vec<T>) -> Vec<Self>;
}

impl<T, S: From<T>> FromVec<T> for S {
    fn from_vec(data: Vec<T>) -> Vec<Self> {
        data.into_iter().map(|e| e.into()).collect()
    }
}
