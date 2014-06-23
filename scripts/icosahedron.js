var icosahedron = {
    name: "icosahedron",
    vertexBuffer: null,
    indexBuffer: null,
    init: function initFn(size, colors) {
        var r = colors[0][0],
            g = colors[0][1],
            b = colors[0][2],
            a = colors[0][3];

        var t = (1.0 + Math.sqrt(5.0)) / 2.0;
        var positions = [
            [-1, t, 0],
            [1, t, 0],
            [-1, -t, 0],
            [1, -t, 0],
            [0, -1, t],
            [0, 1, t],
            [0, -1, -t],
            [0, 1, -t],
            [t, 0, -1],
            [t, 0, 1],
            [-t, 0, -1],
            [-t, 0, 1]
        ];

        var faces = [
            [0, 11, 5],
            [0, 5, 1],
            [0, 1, 7],
            [0, 7, 10],
            [0, 10, 11],
            [1, 5, 9],
            [5, 11, 4],
            [11, 10, 2],
            [10, 7, 6],
            [7, 1, 8],
            [3, 9, 4],
            [3, 4, 2],
            [3, 2, 6],
            [3, 6, 8],
            [3, 8, 9],
            [4, 9, 5],
            [2, 4, 11],
            [6, 2, 10],
            [8, 6, 7],
            [9, 8, 1]
        ];

        var vertexBuffer = graphicsDevice.createVertexBuffer({
            numVertices: faces.length * 3,
            attributes: ['FLOAT3', 'FLOAT3', 'UBYTE4N'],
            dynamic: false,
        });
        if (vertexBuffer) {
            var writer = vertexBuffer.map();
            if (writer) {
                var faceCount = faces.length;
                for (var i = 0; i < faceCount; i += 1) {
                    var face = faces[i]
                    var p0 = positions[face[0]],
                        p1 = positions[face[1]],
                        p2 = positions[face[2]];

                    var d01 = mathDevice.v3Sub(p1, p0);
                    var d02 = mathDevice.v3Sub(p2, p0);
                    var n = mathDevice.v3Normalize(mathDevice.v3Cross(d01, d02));

                    writer(p0[0], p0[1], p0[2], n[0], n[1], n[2], r, g, b, a);
                    writer(p1[0], p1[1], p1[2], n[0], n[1], n[2], r, g, b, a);
                    writer(p2[0], p2[1], p2[2], n[0], n[1], n[2], r, g, b, a);
                }
                vertexBuffer.unmap(writer);
                writer = null;
                this.vertexBuffer = vertexBuffer;
            }
        }
    }
}
