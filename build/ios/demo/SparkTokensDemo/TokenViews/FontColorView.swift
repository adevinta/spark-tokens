//
//  FontColorView.swift
//  SparkTokensDemo
//
//

import Foundation
import SwiftUI
import SparkTokens

struct FontColorRow: View {
    var label: String
    var color: Color
    
    var body: some View {
        HStack {
            Text("Aa")
                .font(.title)
                .foregroundColor(color)
            VStack(alignment: .leading) {
                Text(label)
                    .foregroundColor(color)
            }
            .padding(.leading, Size.paddingMd)
            Spacer()
        }
        .padding(Size.paddingMd)
    }
}

struct FontColorView: View {
    var body: some View {
        ZStack {
            ScrollView {
                VStack {
                    Group {
                        FontColorRow(label:"Main", color:Color.brandMainMain)
                        FontColorRow(label:"Support", color:Color.brandSupportSupport)
                    }
                    Group {
                        FontColorRow(label:"Success", color:Color.brandFeedbackSuccess)
                        FontColorRow(label:"Alert", color:Color.brandFeedbackAlert)
                        FontColorRow(label:"Error", color:Color.brandFeedbackError)
                        FontColorRow(label:"Info", color:Color.brandFeedbackInfo)
                        FontColorRow(label:"Neutral", color:Color.brandFeedbackNeutral)
                    }
                }
            }
        }
        .navigationBarTitle("Font Colors")
        .frame(minWidth: 0, maxWidth: .infinity, minHeight: 0, maxHeight: .infinity)
        .background(Color.brandMainOnMain)
    }
}

struct FontColorView_Previews: PreviewProvider {
    static var previews: some View {
        FontColorView()
    }
}
