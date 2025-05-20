declare -A languages

languages=(
    ["c"]="Dockerfile.c"
    ["cpp"]="Dockerfile.cpp"
    ["java"]="Dockerfile.java"
    ["python2"]="Dockerfile.python2"
    ["python3"]="Dockerfile.python3"
)

for lang in "${!languages[@]}"; do
    echo "Building docker image for $lang..."
    docker build -f "${languages[$lang]}" -t "sandbox_$lang" .
    if [ $? -eq 0 ]; then
        echo "Successfully built sandbox_$lang."
    else 
        echo "Something went wrong while building image."
        exit 1
    fi
done

echo "All images built successfully."